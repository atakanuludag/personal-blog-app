import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDate,
  IsArray,
  ArrayMinSize,
  IsEnum,
} from 'class-validator'
import { Type } from 'class-transformer'
import { ObjectId } from 'mongoose'
import { ArticleType } from '../../common/interfaces/enums'

export class CreateArticleDto {
  @IsNotEmpty()
  @IsString()
  title: string

  @IsNotEmpty()
  @IsString()
  shortDescription: string

  @IsNotEmpty()
  @IsString()
  content: string

  @IsNotEmpty()
  @IsString()
  guid: string

  @IsDate()
  @Type(() => Date)
  publishingDate: Date

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  categories: ObjectId[]

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  tags: ObjectId[]

  @IsNotEmpty()
  @IsEnum(ArticleType)
  articleType: ArticleType

  @IsOptional()
  @IsString()
  coverImage: ObjectId
}
