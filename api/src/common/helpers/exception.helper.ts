import { HttpException, HttpStatus } from '@nestjs/common'

const httpStatusCodeToStatusMessage = (code: HttpStatus): string => {
  switch (code) {
    case 400:
      return 'Bad Request'
    case 500:
      return 'Internal Server Error'
    case 401:
      return 'Unauthorized'
  }
  return String(code)
}

export class ExceptionHelper extends HttpException {
  constructor(message: string, statusCode: HttpStatus) {
    super(
      {
        statusCode,
        error: httpStatusCodeToStatusMessage(statusCode),
        message,
      },
      statusCode,
    )
  }
}
