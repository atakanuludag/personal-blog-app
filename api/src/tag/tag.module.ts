import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { TagController } from '@/tag/tag.controller'
import { TagService } from '@/tag/tag.service'
import { Tag, TagSchema } from '@/tag/schemas/tag.schema'

import { ArticleService } from '@/article/article.service'
import { Article, ArticleSchema } from '@/article/schemas/article.schema'

import { TagMessage } from '@/common/messages'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tag.name, schema: TagSchema }]),
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
  ],
  controllers: [TagController],
  providers: [TagMessage, TagService, ArticleService],
})
export class TagModule {}
