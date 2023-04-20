import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { PageController } from '@/page/page.controller'
import { PageService } from '@/page/page.service'
import { ArticleService } from '@/article/article.service'

import { Page, PageSchema } from '@/page/schemas/page.schema'
import { Article, ArticleSchema } from '@/article/schemas/article.schema'

import { CoreMessage, PageMessage } from '@/common/messages'
import { ExceptionHelper } from '@/common/helpers/exception.helper'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Page.name, schema: PageSchema }]),
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
  ],
  controllers: [PageController],
  providers: [
    CoreMessage,
    PageMessage,
    ExceptionHelper,
    PageService,
    ArticleService,
  ],
})
export class PageModule {}
