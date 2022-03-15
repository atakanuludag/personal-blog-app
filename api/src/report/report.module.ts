import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { ReportService } from './report.service'
import { ReportController } from './report.controller'

import { Article, ArticleSchema } from '../article/schemas/article.schema'
import { Page, PageSchema } from '../page/schemas/page.schema'
import { File, FileSchema } from '../file/schemas/file.schema'

import { CoreMessage } from '../common/messages'
import { ExceptionHelper } from '../common/helpers/exception.helper'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
    MongooseModule.forFeature([{ name: Page.name, schema: PageSchema }]),
    MongooseModule.forFeature([{ name: File.name, schema: FileSchema }]),
  ],
  providers: [ReportService, CoreMessage, ExceptionHelper],
  controllers: [ReportController],
})
export class ReportModule {}
