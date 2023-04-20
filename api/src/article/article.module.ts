import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { ArticleController } from '@/article/article.controller'
import { ArticleService } from '@/article/article.service'
import { PageService } from '@/page/page.service'

import { Article, ArticleSchema } from '@/article/schemas/article.schema'
import { Page, PageSchema } from '@/page/schemas/page.schema'

import { CoreMessage, ArticleMessage } from '@/common/messages'
import { ExceptionHelper } from '@/common/helpers/exception.helper'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
    MongooseModule.forFeature([{ name: Page.name, schema: PageSchema }]),
  ],
  controllers: [ArticleController],
  providers: [
    CoreMessage,
    ArticleMessage,
    ExceptionHelper,
    ArticleService,
    PageService,
  ],
})
export class ArticleModule {}
