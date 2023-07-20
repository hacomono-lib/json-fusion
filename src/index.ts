import { checkBaseDir } from './lib/assert'
import { finalize } from './lib/finalize'
import { loadContext } from './lib/loader'
import { mergeJson } from './lib/merge'
import type { Config } from './lib/type'
import { key } from './lib/common'
import { JsonFusionError } from './lib/error'

export { JsonFusionError, Config }

async function main(baseDir: string, config: Config): Promise<unknown> {
  checkBaseDir(baseDir)

  console.debug(key, 'baseDir:', baseDir)
  console.debug(key, 'config:', config)

  const context = await loadContext(baseDir, config)

  console.debug(key, 'load jsons:', context.jsons)

  const result = mergeJson(context)

  console.debug(key, 'result:', result)

  return await finalize(result, config)
}

/**
 *
 * @param baseDir
 * @param config
 */
function jsonFusion(baseDir: string, config?: Config & { exportType?: 'raw' }): Promise<string>

/**
 *
 * @param baseDir
 * @param config
 */
function jsonFusion<T = unknown>(baseDir: string, config: Config & { exportType: 'object' }): Promise<T>

function jsonFusion(baseDir: string, config: Config = {}): Promise<unknown> {
  return main(baseDir, config)
}

export default jsonFusion
