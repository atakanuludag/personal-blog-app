import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { CategoryController } from '@/category/category.controller'
import { CategoryService } from '@/category/category.service'
import { Category, CategorySchema } from '@/category/schemas/category.schema'

import { ArticleService } from '@/article/article.service'
import { TagService } from '@/tag/tag.service'

import { Article, ArticleSchema } from '@/article/schemas/article.schema'
import { Tag, TagSchema } from '@/tag/schemas/tag.schema'

import { CategoryMessage } from '@/common/messages'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
    MongooseModule.forFeature([{ name: Tag.name, schema: TagSchema }]),
  ],
  controllers: [CategoryController],
  providers: [CategoryMessage, CategoryService, ArticleService, TagService],
})
export class CategoryModule {}
