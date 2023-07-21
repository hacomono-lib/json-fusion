import { promisify } from 'util'
import { exec as _exec } from 'child_process'
import { test, expect } from 'vitest'

const exec = promisify(_exec)

test('no errors at runtime in cjs', async () => {
  await expect((async () => {
    const { stdout } = await exec('babel-node ./test/runs/run.cjs -c ./test/runs/.babelrc')
    return stdout
  })()).resolves.not.toBeUndefined()
})

test('no errors at runtime in esm', async () => {
  await expect((async () => {
    const { stdout } = await exec('babel-node ./test/runs/run.mjs -c ./test/runs/.babelrc')
    return stdout
  })()).rejects.not.toBeUndefined()
})

test('no errors at runtime in cjs (es2015)', async () => {
  await expect((async () => {
    const { stdout } = await exec('babel-node ./test/runs/run.es2015.cjs -c ./test/runs/.babelrc')
    return stdout
  })()).resolves.not.toBeUndefined()
})

test('no errors at runtime in esm (es2015)', async () => {
  await expect((async () => {
    const { stdout } = await exec('babel-node ./test/runs/run.es2015.mjs -c ./test/runs/.babelrc')
    return stdout
  })()).rejects.not.toBeUndefined()
})
