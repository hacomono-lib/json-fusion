
export function checkBaseDir(baseDir: string): void {
  if (!baseDir) {
    throw new Error('baseDir is required')
  }

  // パターンマッチ用文字列だったらエラーにする
  if (baseDir.includes('*')) {
    throw new Error(`baseDir must not contain wildcard. (baseDir: ${baseDir})`)
  }
}
