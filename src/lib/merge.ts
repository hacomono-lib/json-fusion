import { all as merge } from 'deepmerge'
import { JsonFusionContext } from "./loader";

export function mergeJson(context: JsonFusionContext): unknown {
  const jsons = context.jsons
    .sort((a, b) => a.path.localeCompare(b.path))
    .map(({ path, json }) => fixHierarchy(path, json, context.config))

  return merge(jsons)
}

function fixHierarchy(path: string, json: unknown, config: Config): object {
  const keys = path.split('/').filter((key) => key !== '')

  if (!config.noSpreadIndex && keys[keys.length - 1] === 'index') {
    keys.pop()
  }

  if (keys.length === 0) {
    if (typeof json !== 'object') {
      throw new Error('root json must be object')
    }
    return json as object
  }

  return keys.reduceRight((acc, key) => {
    return {
      [key]: acc,
    }
  }, json) as object
}
