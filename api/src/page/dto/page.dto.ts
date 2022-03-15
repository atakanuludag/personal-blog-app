import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsDate, IsBoolean } from 'class-validator'
import { Type } from 'class-transformer'

export class PageDto {
  @ApiProperty({
    description: 'Title',
  })
  @IsNotEmpty()
  @IsString()
  title: string

  @ApiProperty({
    description: 'Short description',
  })
  @IsNotEmpty()
  @IsString()
  shortDescription: string

  @ApiProperty({
    description: 'Content (Html/Text)',
  })
  @IsNotEmpty()
  @IsString()
  content: string

  @ApiProperty({
    description: 'Guid link',
  })
  @IsNotEmpty()
  @IsString()
  guid: string

  @ApiProperty({
    description: 'Publishing date',
  })
  @IsDate()
  @Type(() => Date)
  publishingDate: Date

  @ApiProperty({
    description: 'Show/Hide',
  })
  @IsNotEmpty()
  @IsBoolean()
  isShow: boolean
}
