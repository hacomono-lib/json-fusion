/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const { jsonFusion } = require('../dist/index.cjs');

async function main() {
  const result = await jsonFusion('./fixture/basic', { cwd: __dirname, output: '.output/output-cjs.json' })
  console.log(result)
}

main()
