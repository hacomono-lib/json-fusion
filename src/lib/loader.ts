import { resolve } from 'path'
import { Config } from './type'
import globby from 'globby'

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
  const files = await globFiles(baseDir, config)
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
    cwd: config.cwd,
    ignore: config.ignore ?? []
  })
}

function loadJsons(files: string[], baseDir: string, config: Config): Promise<JsonContext[]> {
  return Promise.all(files.map((path) => loadJson(path, baseDir, config)))
}

const cwd = process.cwd()

async function loadJson(filePath: string, baseDir: string, config: Config): Promise<JsonContext> {
  // FIXME: CJS でコケそう
  const { default: json } = await import(resolve(config.cwd ?? cwd, filePath))

  const path = filePath
    .replace(/^\.\//, '')
    .replace(new RegExp(`^${baseDir}/`), '')
    .replace(/\.json$/, '')

  return {
    filePath,
    path,
    json
  }
}
