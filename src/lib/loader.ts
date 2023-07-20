import { resolve } from 'path'
import { promises } from 'fs'
import { Config } from './type'
import globby from 'globby'
import { ErrorReason, JsonFusionError } from './error'

const { readFile } = promises

export interface JsonFusionContext {
  files: string[]
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
    jsons: await loadJsons(files, baseDir, config)
  }
}

function globFiles(baseDir: string, config: Config): Promise<string[]> {
  return globby(baseDir, {
    expandDirectories: {
      extensions: ['json']
    },
    gitignore: false,
    cwd: config.cwd
  })
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
  const result = await Promise.all(files.map((path) => loadJson(path, baseDir, config)))

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

async function loadJson(
  filePath: string,
  baseDir: string,
  config: Config
): Promise<LoadJsonResult> {
  const importPath = resolve(config.cwd ?? cwd, filePath)

  const path = filePath
    .replace(/^\.\//, '')
    .replace(new RegExp(`^${baseDir.replace(/^\.\//, '')}/`), '')
    .replace(/\.json$/, '')

  const load = async () => {
    const jsonRaw = await readFile(importPath, 'utf-8')
    return JSON.parse(jsonRaw)
  }

  try {
    return {
      filePath,
      path,
      json: await load()
    }
  } catch (e) {
    return {
      filePath,
      path,
      error: errorToString(e)
    }
  }
}

function errorToString(e: unknown): string {
  if (e instanceof Error) {
    return `${e.name}: ${e.message}`
  }
  return String(e)
}

function toErrorReason(result: LoadJsonResult & { error: string }): ErrorReason {
  return {
    message: result.error,
    filePath: result.filePath
  }
}
