import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { ReportService } from './report.service'
import { ReportController } from './report.controller'

import { Article, ArticleSchema } from '../article/schemas/article.schema'

import { CoreMessage } from '../common/messages'
import { ExceptionHelper } from '../common/helpers/exception.helper'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
  ],
  providers: [ReportService, CoreMessage, ExceptionHelper],
  controllers: [ReportController],
})
export class ReportModule {}
