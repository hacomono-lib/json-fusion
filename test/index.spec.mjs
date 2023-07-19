import { describe, expect, test } from 'vitest'
import jsonFusion from '../dist/index.js'
import { mergedJson } from './fixture/basic/mergedResult.js'

describe('jsonFusion using in ESModule', () => {
  test('jsonFusion is a function', () => {
    expect(typeof jsonFusion).toBe('function')
  })

  test('basic using', async () => {
    const resultRaw = await jsonFusion('./fixture/basic', { cwd: __dirname })
    const result = JSON.parse(resultRaw)
    expect(result).toEqual(mergedJson)
  })
})
