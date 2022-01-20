import { HttpStatus } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'

export class DefaultException {
  @ApiProperty({
    description: 'Http Status',
  })
  statusCode: HttpStatus

  @ApiProperty({
    description: 'Error Description',
  })
  error: string

  @ApiProperty({
    description: 'Message',
  })
  message: string | string[]
}
