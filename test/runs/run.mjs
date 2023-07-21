/* eslint-disable no-undef */
import { jsonFusion } from 'json-fusion'

async function main() {
  const result = await jsonFusion('./fixture/basic', { cwd: __dirname, output: '.output/output-esm.json' })
  console.log(result)
}

main()
