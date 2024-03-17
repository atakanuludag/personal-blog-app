import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { FilterQuery, Model, ObjectId } from 'mongoose'
import { IArticle } from '@/article/interfaces/article.interface'
import { IListQueryResponse, IQuery } from '@/common/interfaces/query.interface'
import { Article, ArticleDocument } from '@/article/schemas/article.schema'
import { ArticleDto } from '@/article/dto/article.dto'
import { TagService } from '@/tag/tag.service'
import { slugifyTR } from '@/common/utils/slugify-tr.util'

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article.name)
    private readonly serviceModel: Model<ArticleDocument>,
    private readonly tagService: TagService,
  ) {}

  async getTags(tagItems: string[]) {
    const tags = new Array<ObjectId>()
    for await (const title of tagItems) {
      const tagTitleSearch = await this.tagService.getItemByTitle(title)

      if (tagTitleSearch?._id) {
        tags.push(tagTitleSearch._id)
      } else {
        const tagCreate = await this.tagService.create({
          title,
          guid: slugifyTR(title),
        })
        tags.push(tagCreate._id)
      }
    }

    return tags
  }

  async create(data: ArticleDto): Promise<IArticle> {
    try {
      const tags = await this.getTags(data.tags)
      const create = new this.serviceModel({
        ...data,
        tags,
      })
      return create.save()
    } catch (err) {
      throw new InternalServerErrorException(err)
    }
  }

  async update(data: ArticleDto, id: ObjectId): Promise<IArticle> {
    try {
      const tags = await this.getTags(data.tags)

      return this.serviceModel.findByIdAndUpdate(
        id,
        {
          $set: {
            ...data,
            tags,
          },
        },
        {
          new: true,
        },
      )
    } catch (err) {
      console.log(err)
      throw new BadRequestException(err)
    }
  }

  async getItems(
    query: IQuery,
    category: ObjectId,
    tag: ObjectId,
  ): Promise<IListQueryResponse<IArticle[]> | IArticle[]> {
    try {
      const { pagination, searchQuery, order, paging } = query

      const filter: FilterQuery<ArticleDocument> = {
        ...searchQuery,
      }
      if (category) filter.categories = category
      if (tag) filter.tags = tag

      if (paging) {
        const { page, pageSize, skip } = pagination
        const items = await this.serviceModel
          .find(filter)
          .limit(pageSize)
          .sort(order)
          .skip(skip)
          .populate('categories')
          .populate('tags')
          .populate('coverImage')
          .exec()

        const count = await this.serviceModel.find(filter).countDocuments()

        const totalPages = Math.ceil(count / pageSize)

        const data: IListQueryResponse<IArticle[]> = {
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
        .find(filter)
        .sort(order)
        .populate('categories')
        .populate('tags')
        .populate('coverImage')
        .exec()
    } catch (err) {
      throw new BadRequestException(err)
    }
  }

  async getItemById(_id: ObjectId): Promise<IArticle> {
    try {
      return this.serviceModel
        .findOne({ _id })
        .populate('categories')
        .populate('tags')
        .populate('coverImage')
        .exec()
    } catch (err) {
      throw new BadRequestException(err)
    }
  }

  async getItemByGuid(guid: string): Promise<IArticle> {
    try {
      return this.serviceModel
        .findOne({ guid })
        .populate('categories')
        .populate('tags')
        .populate('coverImage')
        .exec()
    } catch (err) {
      throw new BadRequestException(err)
    }
  }

  // todo: hem article hem pages'da guid exists kontrol edilecek.
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

  async categoryRemoveByObjectId(id: ObjectId): Promise<void> {
    try {
      await this.serviceModel.updateMany(
        { categories: id },
        { $pullAll: { categories: [id] } },
        { multi: true },
      )
    } catch (err) {
      throw new InternalServerErrorException(err)
    }
  }

  // Etiket silindiğinde o etikete bağlı makalalerdeki etiketlerin kimlik numaralarını sil;
  async tagRemoveByObjectId(id: ObjectId): Promise<void> {
    try {
      await this.serviceModel.updateMany(
        { tags: id },
        { $pullAll: { tags: [id] } },
        { multi: true },
      )
    } catch (err) {
      throw new InternalServerErrorException(err)
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

  async updateIPLikeById(_id: ObjectId, ip: string): Promise<number> {
    try {
      await this.serviceModel.findByIdAndUpdate(
        { _id },
        {
          $addToSet: { likedIPs: ip },
        },
      )
      const data = await this.serviceModel.findById(_id).exec()
      return data.likedIPs.length
    } catch (err) {
      throw new BadRequestException(err)
    }
  }

  async searchByIpAndGuid(guid: string, ip: string): Promise<boolean> {
    try {
      const exists = await this.serviceModel.exists({
        guid,
        likedIPs: { $in: [ip] },
      })
      return exists?._id ? true : false
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

  async searchCoverImage(fileId: ObjectId): Promise<boolean> {
    try {
      const exists = await this.serviceModel.exists({
        coverImage: fileId,
      })
      return exists?._id ? true : false
    } catch (err) {
      throw new BadRequestException(err)
    }
  }
}
