import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, ObjectId } from 'mongoose'
import { ICategory } from '@/category/interfaces/category.interface'
import { IListQueryResponse, IQuery } from '@/common/interfaces/query.interface'
import { Category, CategoryDocument } from '@/category/schemas/category.schema'
import { CategoryDto } from '@/category/dto/category.dto'
import { UpdateCategoryDto } from '@/category/dto/update-category.dto'
import { ExceptionHelper } from '@/common/helpers/exception.helper'
import { CoreMessage } from '@/common/messages'

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly serviceModel: Model<CategoryDocument>,
    private readonly coreMessage: CoreMessage,
  ) {}

  async create(data: CategoryDto): Promise<ICategory> {
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

  async update(body: UpdateCategoryDto, id: ObjectId): Promise<ICategory> {
    try {
      return await this.serviceModel.findByIdAndUpdate(
        id,
        {
          $set: body,
        },
        {
          new: true,
        },
      )
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  async getItems(
    query: IQuery,
  ): Promise<IListQueryResponse<ICategory[]> | ICategory[]> {
    try {
      const { pagination, searchQuery, order, paging } = query
      if (paging) {
        const { page, pageSize, skip } = pagination
        const items = await this.serviceModel
          .find(searchQuery)
          .limit(pageSize)
          .sort(order)
          .skip(skip)
          .populate('parent')
          .exec()

        const count = await this.serviceModel.find(searchQuery).countDocuments()

        const totalPages = Math.ceil(count / pageSize)

        const data: IListQueryResponse<ICategory[]> = {
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

      return await this.serviceModel
        .find(searchQuery)
        .sort(order)
        .populate('parent')
        .exec()
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  async getItemById(id: ObjectId): Promise<ICategory> {
    try {
      return await this.serviceModel.findOne({ id }).populate('parent').exec()
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  async getItemByGuid(guid: string): Promise<ICategory> {
    try {
      return await this.serviceModel.findOne({ guid }).populate('parent').exec()
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

  async parentExists(parent: ObjectId): Promise<boolean> {
    try {
      return await this.serviceModel.exists({ parent })
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      )
    }
  }
}
