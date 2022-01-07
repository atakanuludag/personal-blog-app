import { HttpStatus } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'

export class DefaultException {
  @ApiProperty({
    description: 'Http Status',
  })
  statusCode: HttpStatus

  @ApiProperty({
    description: 'Message',
  })
  message: any

  @ApiProperty({
    description: 'Username',
  })
  error: string
}
