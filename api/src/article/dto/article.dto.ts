import { ApiProperty } from '@nestjs/swagger'
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDate,
  IsArray,
  ArrayMinSize,
  IsBoolean,
} from 'class-validator'
import { Type } from 'class-transformer'
import { ObjectId } from 'mongoose'

export class ArticleDto {
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
    description: 'Category ids',
  })
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  categories: ObjectId[]

  @ApiProperty({
    description: 'Tags',
  })
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  tags: string[]

  @ApiProperty({
    type: String,
    description: 'Cover image file id',
  })
  @IsOptional()
  @IsString()
  coverImage: ObjectId

  @ApiProperty({
    description: 'Show/Hide',
  })
  @IsNotEmpty()
  @IsBoolean()
  isShow: boolean
}
