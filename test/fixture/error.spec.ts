import { describe, expect, test } from 'vitest'
import jsonFusion, { JsonFusionError } from '../../src'

describe('error outputs', () => {
  test('invalid json inputs', async () => {
    await expect((async () => {
      await jsonFusion('error', { cwd: __dirname })
    })()).rejects.toThrowError(JsonFusionError)
  })
})
