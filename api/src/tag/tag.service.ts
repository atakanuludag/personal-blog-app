import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, ObjectId } from 'mongoose'
import { ITag } from '@/tag//interfaces/tag.interface'
import { Tag, TagDocument } from '@/tag//schemas/tag.schema'
import { TagDto } from '@/tag/dto/tag.dto'
import { UpdateTagDto } from '@/tag/dto/update-tag.dto'
import { ExceptionHelper } from '@/common/helpers/exception.helper'
import { CoreMessage } from '@/common/messages'
import { IListQueryResponse, IQuery } from '@/common/interfaces/query.interface'

@Injectable()
export class TagService {
  constructor(
    @InjectModel(Tag.name) private readonly serviceModel: Model<TagDocument>,
    private readonly coreMessage: CoreMessage,
  ) {}

  async create(data: TagDto): Promise<ITag> {
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

  async update(body: UpdateTagDto, id: ObjectId): Promise<ITag> {
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

  async getItems(query: IQuery): Promise<IListQueryResponse<ITag[]> | ITag[]> {
    try {
      const { pagination, searchQuery, order, paging } = query
      if (paging) {
        const { page, pageSize, skip } = pagination
        const items = await this.serviceModel
          .find(searchQuery)
          .limit(pageSize)
          .sort(order)
          .skip(skip)
          .exec()

        const count = await this.serviceModel.find(searchQuery).countDocuments()

        const totalPages = Math.ceil(count / pageSize)

        const data: IListQueryResponse<ITag[]> = {
          results: items,
          currentPage: page,
          currentPageSize: items.length,
          pageSize: pageSize,
          totalPages,
          totalResults: count,
          hasNextPage: page < totalPages ? true : false,
        }
        return data
      }

      return await this.serviceModel.find(searchQuery).sort(order).exec()
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  async getItemById(id: ObjectId): Promise<ITag> {
    try {
      return await this.serviceModel.findOne({ id }).exec()
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  async getItemByGuid(guid: string): Promise<ITag> {
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
        this.coreMessage.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }
}
