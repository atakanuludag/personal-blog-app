import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Article, ArticleDocument } from '../article/schemas/article.schema'
import { Page, PageDocument } from '../page/schemas/page.schema'
import { File, FileDocument } from '../file/schemas/file.schema'

import { ExceptionHelper } from '../common/helpers/exception.helper'
import { CoreMessage } from '../common/messages'

@Injectable()
export class ReportService {
  constructor(
    @InjectModel(Article.name)
    private readonly articleModel: Model<ArticleDocument>,
    @InjectModel(Page.name)
    private readonly pageModel: Model<PageDocument>,
    @InjectModel(File.name)
    private readonly fileModel: Model<FileDocument>,
    private readonly coreMessage: CoreMessage,
  ) {}

  async getArticleCount(): Promise<number> {
    try {
      return await this.articleModel.find({ isShow: true }).countDocuments()
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  async getPageCount(): Promise<number> {
    try {
      return await this.pageModel.find({ isShow: true }).countDocuments()
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  async getFileCount(): Promise<number> {
    try {
      return await this.fileModel.find().countDocuments()
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }
}
