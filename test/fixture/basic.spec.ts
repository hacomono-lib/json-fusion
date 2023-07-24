import { resolve } from 'path'
import { stringify } from 'yaml'
import { describe, expect, test } from 'vitest'
import { jsonFusion } from '../../src'
import { mergedJson, mergedYaml, full, noSpreadJson } from './basic/mergedResult.js'

describe('directory pattern', () => {
  test('simple usage', async () => {
    const resultRaw = await jsonFusion('basic', { cwd: __dirname })
    const result = JSON.parse(resultRaw)
    expect(result).toEqual(mergedJson)
  })

  test('complex baseDir', async () => {
    const resultRaw = await jsonFusion('./fixture/basic', { cwd: resolve(__dirname, '..') })
    const result = JSON.parse(resultRaw)
    expect(result).toEqual(mergedJson)
  })

  test('without cwd', async () => {
    const resultRaw = await jsonFusion('./test/fixture/basic')
    const result = JSON.parse(resultRaw)
    expect(result).toEqual(mergedJson)
  })
})

describe('options test', () => {
  test('ignore', async () => {
    const resultRaw = await jsonFusion('basic', { cwd: __dirname, ignore: ['**/config.json'] })
    const result = JSON.parse(resultRaw)
    expect(result).toEqual({ ...mergedJson, config: undefined })
  })

  describe('exportType', () => {
    test('json', async () => {
      const resultRaw = await jsonFusion('basic', { cwd: __dirname, exportType: 'json' })
      expect(resultRaw).toEqual(JSON.stringify(mergedJson, null, 2))
    })

    test('yaml', async () => {
      const resultRaw = await jsonFusion('basic', { cwd: __dirname, exportType: 'yaml' })
      expect(resultRaw).toEqual(stringify(mergedJson, { indent: 2 }))
    })

    test('object', async () => {
      const result = await jsonFusion('basic', { cwd: __dirname, exportType: 'object' })
      expect(result).toEqual(mergedJson)
    })
  })

  describe('extension', () => {
    test('yaml', async () => {
      const result = await jsonFusion('basic', { cwd: __dirname, extensions: ['yaml'], exportType: 'object' })
      expect(result).toEqual(mergedYaml)
    })

    test('json, yaml', async () => {
      const result = await jsonFusion('basic', { cwd: __dirname, extensions: ['json', 'yaml'], exportType: 'object' })
      expect(result).toEqual(full)
    })
  })

  test('noSpreadIndex', async () => {
    const result = await jsonFusion('basic', { cwd: __dirname, noSpreadIndex: true, exportType: 'object' })
    expect(result).toEqual(noSpreadJson)
  })
})
