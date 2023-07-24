import { Config, ExportType } from "./type"
import { promises } from 'fs'
import { resolve } from 'path'

export async function finalize(result: unknown, config: Config): Promise<unknown> {
  const finalized = await stringifyMap[config.exportType ?? 'json'](result)

  if (config.exportType !== 'object' && config.export) {
    await outputFile(finalized as string, config)
  }

  return finalized
}

async function outputFile(result: string, config: Config): Promise<void> {
  const exportPath = resolve(config.cwd ?? process.cwd(), config.export!)

  await promises.mkdir(exportPath, { recursive: true })

  await promises.writeFile(exportPath, JSON.stringify(result, null, 2))
}

type Finalize = (result: unknown) => string | unknown | Promise<string>

const stringifyMap = {
  json: (result: unknown) => JSON.stringify(result, null, 2),
  yaml: async (result: unknown) => {
    const { stringify } = await import('yaml')
    return stringify(result, { indent: 2 })
  },
  object: (result: unknown) => result
} as const satisfies Record<ExportType, Finalize>
