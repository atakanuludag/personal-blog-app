import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { ReportService } from '@/report/report.service'
import { ReportController } from '@/report/report.controller'

import { Article, ArticleSchema } from '@/article/schemas/article.schema'
import { Page, PageSchema } from '@/page/schemas/page.schema'
import { File, FileSchema } from '@/file/schemas/file.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
    MongooseModule.forFeature([{ name: Page.name, schema: PageSchema }]),
    MongooseModule.forFeature([{ name: File.name, schema: FileSchema }]),
  ],
  providers: [ReportService],
  controllers: [ReportController],
})
export class ReportModule {}
