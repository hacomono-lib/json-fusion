import { loadJson } from './lib/loader'
import { mergeJson } from './lib/merge'
import { Config, Pattern } from './lib/type'

async function main(config: Config): Promise<unknown> {
  const context = await loadJson(config)
  const result = mergeJson(context)

  if (config.exportType === 'object') {
    return result
  }

  return JSON.stringify(result, null, 2)
}

/**
 *
 * @param input
 */
function jsonFusion(patterns: Pattern | Pattern[]): Promise<string>

/**
 *
 * @param inputConfig
 */
function jsonFusion(inputConfig: Config & { exportType?: 'raw' }): Promise<string>

/**
 *
 * @param inputConfig
 */
function jsonFusion<T = unknown>(inputConfig: Config & { exportType: 'object' }): Promise<T>

function jsonFusion(input: Pattern | Pattern[] | Config): Promise<unknown> {
  if (typeof input === 'string' || Array.isArray(input)) {
    return jsonFusion({ pattern: input }) as Promise<unknown>
  }

  return main(input)
}

export default jsonFusion
