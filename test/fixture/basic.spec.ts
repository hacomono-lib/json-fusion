import { resolve } from 'path'
import { describe, expect, test } from 'vitest'
import jsonFusion from '../../src'
import { mergedJson } from './basic/mergedResult.js'

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

  test('exportType: raw', async () => {
    const resultRaw = await jsonFusion('basic', { cwd: __dirname, exportType: 'raw' })
    expect(typeof resultRaw).toBe('string')
  })

  test('exportType: object', async () => {
    const result = await jsonFusion('basic', { cwd: __dirname, exportType: 'object' })
    expect(result).toEqual(mergedJson)
  })
})
