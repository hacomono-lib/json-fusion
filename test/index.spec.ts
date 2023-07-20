import { promisify } from 'util'
import { exec as _exec } from 'child_process'
import { test, expect } from 'vitest'

const exec = promisify(_exec)

test('no errors at runtime in cjs', async () => {
  await expect((async () => {
    const { stdout } = await exec('node ./test/run.cjs')
    return stdout
  })()).resolves.not.toBeUndefined()
})

test('no errors at runtime in esm', async () => {
  await expect((async () => {
    const { stdout } = await exec('node ./test/run.mjs')
    return stdout
  })()).rejects.not.toBeUndefined()
})
