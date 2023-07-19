import { Config } from "./type"

export function finalize(result: unknown, config: Config): string {
  if (config.exportType === 'raw' || !config.exportType) {
    return JSON.stringify(result, null, 2)
  }

  return result as string
}
