import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class FolderDto {
  @ApiProperty({
    description: 'Folder title',
  })
  @IsNotEmpty()
  @IsString()
  title: string

  @ApiProperty({
    description: 'Folder path',
  })
  @IsNotEmpty()
  @IsString()
  path: string
}
