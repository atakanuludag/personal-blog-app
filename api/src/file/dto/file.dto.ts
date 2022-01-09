import { ApiProperty } from '@nestjs/swagger'

export class FileDto {
  @ApiProperty({
    description: 'Title',
  })
  title: string

  @ApiProperty({
    description: 'Description',
  })
  description: string

  @ApiProperty({
    description: 'File name',
  })
  filename: string

  @ApiProperty({
    description: 'Path',
  })
  path: string

  @ApiProperty({
    description: 'Mime type',
  })
  mimetype: string

  @ApiProperty({
    description: 'File Size',
  })
  size: number
}
