import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, ObjectId } from 'mongoose'
import { ICategory } from '@/category/interfaces/category.interface'
import { IListQueryResponse, IQuery } from '@/common/interfaces/query.interface'
import { Category, CategoryDocument } from '@/category/schemas/category.schema'
import { CategoryDto } from '@/category/dto/category.dto'
import { UpdateCategoryDto } from '@/category/dto/update-category.dto'

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly serviceModel: Model<CategoryDocument>,
  ) {}

  async create(data: CategoryDto): Promise<ICategory> {
    try {
      const create = new this.serviceModel(data)
      return create.save()
    } catch (err) {
      throw new InternalServerErrorException(err)
    }
  }

  async update(body: UpdateCategoryDto, id: ObjectId): Promise<ICategory> {
    try {
      return this.serviceModel.findByIdAndUpdate(
        id,
        {
          $set: body,
        },
        {
          new: true,
        },
      )
    } catch (err) {
      throw new BadRequestException(err)
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

      return this.serviceModel
        .find(searchQuery)
        .sort(order)
        .populate('parent')
        .exec()
    } catch (err) {
      throw new BadRequestException(err)
    }
  }

  async getItemById(id: ObjectId): Promise<ICategory> {
    try {
      return this.serviceModel.findOne({ id }).populate('parent').exec()
    } catch (err) {
      throw new BadRequestException(err)
    }
  }

  async getItemByGuid(guid: string): Promise<ICategory> {
    try {
      return this.serviceModel.findOne({ guid }).populate('parent').exec()
    } catch (err) {
      throw new BadRequestException(err)
    }
  }

  async guidExists(guid: string): Promise<boolean> {
    try {
      const exists = await this.serviceModel.exists({ guid })
      return exists?._id ? true : false
    } catch (err) {
      throw new BadRequestException(err)
    }
  }

  async delete(id: ObjectId): Promise<void> {
    try {
      await this.serviceModel.findByIdAndDelete(id)
    } catch (err) {
      throw new InternalServerErrorException(err)
    }
  }

  async parentExists(parent: ObjectId): Promise<boolean> {
    try {
      const exists = await this.serviceModel.exists({ parent })
      return exists?._id ? true : false
    } catch (err) {
      throw new BadRequestException(err)
    }
  }
}
