import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, ObjectId } from 'mongoose'
import { ITag } from '@/tag//interfaces/tag.interface'
import { Tag, TagDocument } from '@/tag//schemas/tag.schema'
import { TagDto } from '@/tag/dto/tag.dto'
import { UpdateTagDto } from '@/tag/dto/update-tag.dto'
import { IListQueryResponse, IQuery } from '@/common/interfaces/query.interface'

@Injectable()
export class TagService {
  constructor(
    @InjectModel(Tag.name) private readonly serviceModel: Model<TagDocument>,
  ) {}

  async create(data: TagDto): Promise<ITag> {
    try {
      const create = new this.serviceModel(data)
      return create.save()
    } catch (err) {
      throw new InternalServerErrorException(err)
    }
  }

  async update(body: UpdateTagDto, id: ObjectId): Promise<ITag> {
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

      return this.serviceModel.find(searchQuery).sort(order).exec()
    } catch (err) {
      throw new BadRequestException(err)
    }
  }

  async getItemById(id: ObjectId): Promise<ITag> {
    try {
      return this.serviceModel.findOne({ id }).exec()
    } catch (err) {
      throw new BadRequestException(err)
    }
  }

  async getItemByGuid(guid: string): Promise<ITag> {
    try {
      return this.serviceModel.findOne({ guid }).exec()
    } catch (err) {
      throw new BadRequestException(err)
    }
  }

  async getItemByTitle(title: string): Promise<ITag> {
    try {
      return this.serviceModel
        .findOne({ title: { $regex: new RegExp(`^${title}$`), $options: 'i' } })
        .exec()
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
}
