import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Article, ArticleDocument } from '../article/schemas/article.schema'
import { ExceptionHelper } from '../common/helpers/exception.helper'
import { CoreMessage } from '../common/messages'

@Injectable()
export class ReportService {
  constructor(
    @InjectModel(Article.name)
    private readonly serviceModel: Model<ArticleDocument>,
    private readonly coreMessage: CoreMessage,
  ) {}

  async getArticleCount(): Promise<number> {
    try {
      return await this.serviceModel.find().countDocuments()
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }
}
