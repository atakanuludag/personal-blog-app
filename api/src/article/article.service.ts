import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, ObjectId } from 'mongoose'
import { IArticle } from './interfaces/article.interface'
import { IArticleList } from './interfaces/article-list.interface'
import { IQuery } from '../common/interfaces/query.interface'
import { Article, ArticleDocument } from './schemas/article.schema'
import { ArticleDto } from './dto/article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'
import { ExceptionHelper } from '../common/helpers/exception.helper'
import { CoreMessage } from '../common/messages'

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article.name)
    private readonly articleModel: Model<ArticleDocument>,
    private readonly coreMessage: CoreMessage,
  ) {}

  async create(data: ArticleDto): Promise<IArticle> {
    try {
      const create = new this.articleModel(data)
      return create.save()
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  async update(body: UpdateArticleDto, id: ObjectId): Promise<IArticle> {
    try {
      return await this.articleModel.findByIdAndUpdate(id, {
        $set: body,
      })
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  async getItems(query: IQuery): Promise<IArticleList> {
    try {
      const { pagination, searchQuery, order } = query
      const { page, pageSize, skip } = pagination

      const items = await this.articleModel
        .find(searchQuery)
        .limit(pageSize)
        .sort(order)
        .skip(skip)
        .populate('categories')
        .populate('tags')
        .populate('coverImage')
        .exec()

      const count = await this.articleModel.find(searchQuery).countDocuments()

      const totalPages = Math.ceil(count / pageSize)

      const data: IArticleList = {
        results: items,
        currentPage: page,
        currentPageSize: items.length,
        pageSize: pageSize,
        totalPages,
        totalResults: count,
        hasNextPage: page < totalPages ? true : false,
      }
      return data
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  async getItemById(_id: ObjectId): Promise<IArticle> {
    try {
      return await this.articleModel
        .findOne({ _id })
        .populate('categories')
        .populate('tags')
        .populate('coverImage')
        .exec()
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  async getItemByGuid(guid: string): Promise<IArticle> {
    try {
      return await this.articleModel
        .findOne({ guid })
        .populate('categories')
        .populate('tags')
        .populate('coverImage')
        .exec()
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  async guidExists(guid: string): Promise<boolean> {
    try {
      return await this.articleModel.exists({ guid })
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  async delete(id: ObjectId): Promise<void> {
    try {
      await this.articleModel.findByIdAndDelete(id)
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  async categoryRemoveByObjectId(id: ObjectId): Promise<void> {
    try {
      await this.articleModel.updateMany(
        { categories: id },
        { $pullAll: { categories: [id] } },
        { multi: true },
      )
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  async tagRemoveByObjectId(id: ObjectId): Promise<void> {
    try {
      await this.articleModel.updateMany(
        { tags: id },
        { $pullAll: { tags: [id] } },
        { multi: true },
      )
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }
}
