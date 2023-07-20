import { Config } from "./type"
import { promises } from 'fs'
import { resolve } from 'path'

export async function finalize(result: unknown, config: Config): Promise<string> {

  let stringifiedResult: string
  const stringify = () => {
    if (stringifiedResult) {
      return stringifiedResult
    }
    return stringifiedResult = JSON.stringify(result, null, 2)
  }

  if (config.exportType === 'raw' || !config.exportType) {
    return stringify()
  }

  if (config.export) {
    await outputFile(stringify(), config)
  }

  return result as string
}


async function outputFile(result: string, config: Config): Promise<void> {
  const exportPath = resolve(config.cwd ?? process.cwd(), config.export!)

  await promises.mkdir(exportPath, { recursive: true })

  await promises.writeFile(exportPath, JSON.stringify(result, null, 2))
}
