import { resolve } from 'path'
import { promises } from 'fs'
import { Config, Extension } from './type'
import globby from 'globby'
import { ErrorReason, JsonFusionError } from './error'

const { readFile } = promises

export interface JsonFusionContext {
  files: string[]
  config: Config
  jsons: JsonContext[]
}

export interface JsonContext {
  filePath: string
  path: string
  json: unknown
}

export async function loadContext(baseDir: string, config: Config): Promise<JsonFusionContext> {
  const [founds, ignores] = await Promise.all([
    globFiles(baseDir, config),
    ignoreFiles(baseDir, config)
  ])
  const files = founds.filter((file) => !ignores.includes(file))

  return {
    files,
    config,
    jsons: await loadJsons(files, baseDir, config)
  }
}

function globFiles(baseDir: string, config: Config): Promise<string[]> {
  return globby(baseDir, {
    expandDirectories: {
      extensions: (config.extensions ?? ['json']).flatMap((ext) => extensionAliases[ext])
    },
    gitignore: false,
    cwd: config.cwd
  })
}

const extensionAliases = {
  yaml: ['yml', 'yaml'],
  json: ['json']
} satisfies Record<Extension, string[]>

const extensions = Object.values(extensionAliases).flat()

function getExtension(filePath: string): string {
  const ext = filePath.split('.').pop() ?? ''
  const found = Object.entries(extensionAliases).find(([, aliases]) =>
    (aliases as readonly string[]).includes(ext)
  )
  return found?.[0] ?? ext
}

async function ignoreFiles(baseDir: string, config: Config): Promise<string[]> {
  if ((config.ignore ?? []).length <= 0) {
    return []
  }

  return globby(config.ignore!, {
    gitignore: true,
    cwd: config.cwd
  })
}

async function loadJsons(files: string[], baseDir: string, config: Config): Promise<JsonContext[]> {
  const loader = new JsonLoader(baseDir, config)
  await loader.init()

  const result = await Promise.all(files.map((path) => loader.load(path)))

  const errors = result.filter((item): item is LoadJsonResult & { error: string } => !!item.error)
  if (errors.length > 0) {
    throw new JsonFusionError('Failed to load jsons', errors.map(toErrorReason))
  }

  return result as JsonContext[]
}

const cwd = process.cwd()

interface LoadJsonResult {
  filePath: string
  path: string
  json?: unknown
  error?: string
}

type Parser = (raw: string) => unknown

class JsonLoader {
  constructor(
    private readonly baseDir: string,
    private readonly config: Config
  ) {}

  #parsers: Partial<Record<Extension, Parser>> = {
    json: (raw) => JSON.parse(raw)
  }

  async init() {
    if (this.config.extensions?.includes('yaml')) {
      this.#parsers.yaml = await this.#createYamlParser()
    }
  }

  async #createYamlParser(): Promise<Parser> {
    const { parse } = await import('yaml')
    return (raw) => parse(raw, { prettyErrors: true })
  }

  #assertSupportedExtension(ext: string): asserts ext is Extension {
    if (!(this.config.extensions ?? ['json']).includes(ext as Extension)) {
      throw new Error(`Unsupported file extension: ${ext}`)
    }
  }

  #getPath(filePath: string): string {
    return filePath
      .replace(/^\.\//, '')
      .replace(new RegExp(`^${this.baseDir.replace(/^\.\//, '')}/`), '')
      .replace(new RegExp(`\\.(${extensions.join('|')})$`), '')
  }

  #parse(raw: string, ext: Extension): unknown {
    const parser = this.#parsers[ext]
    if (!parser) {
      throw new Error(`Unsupported file extension: ${ext}`)
    }
    return parser(raw)
  }

  #errorToString(e: unknown): string {
    if (e instanceof Error) {
      return `${e.name}: ${e.message}`
    }
    return String(e)
  }

  async load(filePath: string): Promise<LoadJsonResult> {
    const importPath = resolve(this.config.cwd ?? cwd, filePath)
    const ext = getExtension(filePath)
    this.#assertSupportedExtension(ext)
    const path = this.#getPath(filePath)

    const raw = await readFile(importPath, 'utf-8')

    try {
      return {
        filePath,
        path,
        json: this.#parse(raw, ext)
      }
    } catch (e) {
      return {
        filePath,
        path,
        error: this.#errorToString(e)
      }
    }
  }
}

function toErrorReason(result: LoadJsonResult & { error: string }): ErrorReason {
  return {
    message: result.error,
    filePath: result.filePath
  }
}
