import { PartialType } from '@nestjs/swagger'
//import { OmitType, PartialType } from '@nestjs/mapped-types'
import { ArticleDto } from '@/article/dto/article.dto'

export class UpdateArticleDto extends PartialType(ArticleDto) {}
