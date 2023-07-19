import { Config } from './type'
import globby from 'globby'

export interface LoadJsonContext {}

export async function loadJson(config: Config): LoadJsonContext {
  const globbed = await globby(config.pattern ?? '**/*', {
    expandDirectories: {
      extensions: ['json'],
    },
    gitignore: false,
    cwd: config.cwd,
    ignore: config.ignore,
  })
  console.log(globbed)
  return {}
}

