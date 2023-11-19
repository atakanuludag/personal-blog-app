import { ApiProperty } from '@nestjs/swagger'

export class UpdateFileDto {
  @ApiProperty({
    description: 'Title',
  })
  title: string

  @ApiProperty({
    description: 'Description',
  })
  description: string
}
