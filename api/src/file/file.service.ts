import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, ObjectId } from 'mongoose'
import { IFile } from '@/file/interfaces/file.interface'
import { File, FileDocument } from '@/file/schemas/file.schema'
//import { CreateCategoryDto } from './dto/create-category.dto';
//import { UpdateCategoryDto } from './dto/update-category.dto';
import { ExceptionHelper } from '@/common/helpers/exception.helper'
import { CoreMessage } from '@/common/messages'
import { IListQueryResponse, IQuery } from '@/common/interfaces/query.interface'

@Injectable()
export class FileService {
  constructor(
    @InjectModel(File.name) private readonly serviceModel: Model<FileDocument>,
    private readonly coreMessage: CoreMessage,
  ) {}

  async getItems(
    query: IQuery,
  ): Promise<IListQueryResponse<IFile[]> | IFile[]> {
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

        const data: IListQueryResponse<IFile[]> = {
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

  async saveFile(data: File[]): Promise<IFile[]> {
    try {
      const createItems = await this.serviceModel.insertMany(data)
      return createItems
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  async createFolder(folderTitle: string, path: string): Promise<IFile> {
    try {
      const findFolderPath = await this.getFolderByPath(path)
      if (findFolderPath) {
        return findFolderPath
      }
      const create = new this.serviceModel({
        title: folderTitle,
        description: null,
        filename: null,
        isFolder: true,
        mimetype: null,
        path,
        size: null,
      })
      return create.save()
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  async getFolderByPath(path: string): Promise<IFile> {
    try {
      return await this.serviceModel.findOne({ isFolder: true, path }).exec()
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      )
    }
  }
}
