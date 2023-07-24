
export type Pattern = string

export type Extension = 'json' | 'yaml'

export type ExportType = 'json' | 'yaml' | 'object'

export interface Config {
  /**
   * specify the method return type
   * @default 'json'
   */
  exportType?: ExportType

  /**
   * ignore files
   * @default: undefined
   */
  ignore?: Pattern[]

  /**
   * set the current working directory
   * @default: './'
   */
  cwd?: string

  /**
   * set the output file path
   * @example 'dist/index.json'
   * @default undefined
   */
  export?: string

  /**
   * set the input file extensions
   * @example ['json', 'yaml']
   * @default ['json']
   */
  extensions?: Extension[]
}
