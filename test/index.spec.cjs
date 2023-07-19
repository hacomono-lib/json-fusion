/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const vitest = require('vitest')

console.log(vitest)
const jsonFusion = require('../dist/index.cjs')
const { mergedJson } = require('./fixture/basic/mergedResult.cjs')

describe('jsonFusion using in CommonJS', () => {
  test('jsonFusion is a function', () => {
    expect(typeof jsonFusion).toBe('function')
  })

  test('basic using', async () => {
    const resultRaw = await jsonFusion('./fixture/basic', { cwd: __dirname })
    const result = JSON.parse(resultRaw)
    expect(result).toEqual(mergedJson)
  })
})
