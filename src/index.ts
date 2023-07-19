import { checkBaseDir } from './lib/assert'
import { finalize } from './lib/finalize'
import { loadContext } from './lib/loader'
import { mergeJson } from './lib/merge'
import { Config } from './lib/type'

async function main(baseDir: string, config: Config): Promise<unknown> {
  checkBaseDir(baseDir)

  const context = await loadContext(baseDir, config)

  const result = mergeJson(context)

  return finalize(result, config)
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
