import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Article, ArticleDocument } from '@/article/schemas/article.schema'
import { Page, PageDocument } from '@/page/schemas/page.schema'
import { File, FileDocument } from '@/file/schemas/file.schema'

@Injectable()
export class ReportService {
  constructor(
    @InjectModel(Article.name)
    private readonly articleModel: Model<ArticleDocument>,
    @InjectModel(Page.name)
    private readonly pageModel: Model<PageDocument>,
    @InjectModel(File.name)
    private readonly fileModel: Model<FileDocument>,
  ) {}

  async getArticleCount(): Promise<number> {
    try {
      return this.articleModel.find({ isShow: true }).countDocuments()
    } catch (err) {
      throw new InternalServerErrorException(err)
    }
  }

  async getPageCount(): Promise<number> {
    try {
      return this.pageModel.find({ isShow: true }).countDocuments()
    } catch (err) {
      throw new InternalServerErrorException(err)
    }
  }

  async getFileCount(): Promise<number> {
    try {
      return this.fileModel.find().countDocuments()
    } catch (err) {
      throw new InternalServerErrorException(err)
    }
  }
}
