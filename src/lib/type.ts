
export type Pattern = string

export interface Config {
  /**
   * @default 'raw'
   */
  exportType?: 'raw' | 'object'

  /**
   * @default '**\/*.json''
   */
  pattern?: Pattern | Pattern[]

  /**
   * @default: undefined
   */
  ignore?: Pattern[]

  /**
   * @default: './'
   */
  cwd?: string
}
