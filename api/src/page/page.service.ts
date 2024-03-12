import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, ObjectId } from 'mongoose'
import { IPage } from '@/page/interfaces/page.interface'
import { IListQueryResponse, IQuery } from '@/common/interfaces/query.interface'
import { Page, PageDocument } from '@/page/schemas/page.schema'
import { PageDto } from '@/page/dto/page.dto'
import { UpdatePageDto } from '@/page/dto/update-page.dto'

@Injectable()
export class PageService {
  constructor(
    @InjectModel(Page.name)
    private readonly serviceModel: Model<PageDocument>,
  ) {}

  async create(data: PageDto): Promise<IPage> {
    try {
      const create = new this.serviceModel(data)
      return create.save()
    } catch (err) {
      throw new InternalServerErrorException(err)
    }
  }

  async update(body: UpdatePageDto, id: ObjectId): Promise<IPage> {
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
  ): Promise<IListQueryResponse<IPage[]> | IPage[]> {
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

        const data: IListQueryResponse<IPage[]> = {
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

      return this.serviceModel.find(searchQuery).sort(order).exec()
    } catch (err) {
      throw new BadRequestException(err)
    }
  }

  async getItemById(_id: ObjectId): Promise<IPage> {
    try {
      return this.serviceModel.findOne({ _id }).exec()
    } catch (err) {
      throw new BadRequestException(err)
    }
  }

  async getItemByGuid(guid: string): Promise<IPage> {
    try {
      return this.serviceModel.findOne({ guid }).exec()
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
      throw new BadRequestException(err)
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
      throw new BadRequestException(err)
    }
  }

  async searchContent(text: string): Promise<boolean> {
    try {
      const exists = await this.serviceModel.exists({
        content: { $regex: text, $options: 'i' },
      })
      return exists?._id ? true : false
    } catch (err) {
      throw new BadRequestException(err)
    }
  }
}
