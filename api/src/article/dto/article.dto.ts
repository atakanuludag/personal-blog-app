import { ApiProperty } from '@nestjs/swagger'
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDate,
  IsArray,
  ArrayMinSize,
  IsEnum,
  IsBoolean,
} from 'class-validator'
import { Type } from 'class-transformer'
import { ObjectId } from 'mongoose'
import { ArticleType } from '../../common/interfaces/enums'

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
    description: 'Tag ids',
  })
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  tags: ObjectId[]

  @ApiProperty({
    description: 'Article type (post/page)',
    type: String,
    enum: ArticleType,
  })
  @IsNotEmpty()
  @IsEnum(ArticleType)
  articleType: ArticleType

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
