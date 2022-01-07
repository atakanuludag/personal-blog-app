import {
  IsString,
  IsDate,
  IsArray,
  ArrayMinSize,
  IsOptional,
  IsNotEmpty,
  IsEnum,
} from 'class-validator'
import { Type } from 'class-transformer'
import { ObjectId } from 'mongoose'
import {
  ApiProperty,
  ApiPropertyOptional,
  PartialType as SwaggerPartialType,
} from '@nestjs/swagger'
import { PartialType } from '@nestjs/mapped-types'
import { ArticleType } from '../../common/interfaces/enums'
import { ArticleDto } from './article.dto'

export class UpdateArticleDto extends PartialType(ArticleDto) {
  @ApiProperty({
    description: 'Short description',
  })
  @IsNotEmpty()
  @IsString()
  shortDescription: string
}
