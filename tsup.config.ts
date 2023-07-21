import { defineConfig, Options } from 'tsup'
import config from './package.json'


const commonOption = {
  name: config.name,
  entryPoints: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  treeshake: true,
  sourcemap: true,
  clean: true,
  esbuildOptions(options, _context) {
    options.drop = [...(options.drop ?? []), 'console']
  }
} satisfies Options

export default defineConfig([
  {
    ...commonOption,
    target: ['esnext'],
  },
  {
    ...commonOption,
    target: ['es2015'],
    outDir: 'dist/es2015'
  }
])
