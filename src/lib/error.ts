export interface ErrorReason {
  message: string
  filePath: string
}

export class JsonFusionError extends Error {
  override name = 'JsonFusionError'

  constructor(
    message: string,
    reasons: ErrorReason[]
  ) {
    super(createMessage(message, reasons))
  }
}

function createMessage(message: string, reasons: ErrorReason[]): string {
  return `${message}\n${reasons
    .map(({ message, filePath }) =>
      ['  -', message, filePath ? `(filePath: ${filePath})` : ''].join(' ')
    )
    .join('\n')}`
}
