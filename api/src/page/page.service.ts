import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, ObjectId } from 'mongoose'
import { IPage } from './interfaces/page.interface'
import { IPageList } from './interfaces/page-list.interface'
import { IQuery } from '../common/interfaces/query.interface'
import { Page, PageDocument } from './schemas/page.schema'
import { PageDto } from './dto/page.dto'
import { UpdatePageDto } from './dto/update-page.dto'
import { ExceptionHelper } from '../common/helpers/exception.helper'
import { CoreMessage } from '../common/messages'

@Injectable()
export class PageService {
  constructor(
    @InjectModel(Page.name)
    private readonly serviceModel: Model<PageDocument>,
    private readonly coreMessage: CoreMessage,
  ) {}

  async create(data: PageDto): Promise<IPage> {
    try {
      const create = new this.serviceModel(data)
      return create.save()
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  async update(body: UpdatePageDto, id: ObjectId): Promise<IPage> {
    try {
      return await this.serviceModel.findByIdAndUpdate(id, {
        $set: body,
      })
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  async getItems(query: IQuery): Promise<IPageList> {
    try {
      const { pagination, searchQuery, order } = query
      const { page, pageSize, skip } = pagination

      const items = await this.serviceModel
        .find(searchQuery)
        .limit(pageSize)
        .sort(order)
        .skip(skip)
        .exec()

      const count = await this.serviceModel.find(searchQuery).countDocuments()

      const totalPages = Math.ceil(count / pageSize)

      const data: IPageList = {
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

  async getItemById(_id: ObjectId): Promise<IPage> {
    try {
      return await this.serviceModel.findOne({ _id }).exec()
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  async getItemByGuid(guid: string): Promise<IPage> {
    try {
      return await this.serviceModel.findOne({ guid }).exec()
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  async guidExists(guid: string): Promise<boolean> {
    try {
      return await this.serviceModel.exists({ guid })
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  async delete(id: ObjectId): Promise<void> {
    try {
      await this.serviceModel.findByIdAndDelete(id)
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  async updateIPViewByGuid(guid: string, ip: string): Promise<void> {
    try {
      await this.serviceModel.findOneAndUpdate(
        { guid },
        {
          $addToSet: { viewIPs: ip },
        },
      )
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      )
    }
  }
}
