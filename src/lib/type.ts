
export type Pattern = string

export interface Config {
  /**
   * 
   * @default 'raw'
   */
  exportType?: 'raw' | 'object'

  /**
   * 
   * @default: undefined
   */
  ignore?: Pattern[]

  /**
   * 
   * @default: './'
   */
  cwd?: string

  /**
   * @example 'dist/index.json'
   * @default undefined
   */
  export?: string
}
