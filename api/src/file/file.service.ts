import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, ObjectId } from 'mongoose'
import { IFile } from './interfaces/file.interface'
import { File, FileDocument } from './schemas/file.schema'
//import { CreateCategoryDto } from './dto/create-category.dto';
//import { UpdateCategoryDto } from './dto/update-category.dto';
import { ExceptionHelper } from '../common/helpers/exception.helper'
import { CoreMessage } from '../common/messages'
import { IQuery } from '../common/interfaces/query.interface'
import { IFileList } from './interfaces/file-list.interface'

@Injectable()
export class FileService {
  constructor(
    @InjectModel(File.name) private readonly fileModel: Model<FileDocument>,
    private readonly coreMessage: CoreMessage,
  ) {}

  async getItems(query: IQuery): Promise<IFileList> {
    try {
      const items = await this.fileModel
        .find(query.searchQuery)
        .skip(query.pagination.skip)
        .limit(query.pagination.pageSize)
        .sort(query.order ? query.order : '-createdAt')
        .exec()

      const count = await this.fileModel
        .find(query.searchQuery)
        .countDocuments()

      const data: IFileList = {
        results: items,
        currentPage: query.pagination.page,
        currentPageSize: items.length,
        pageSize: query.pagination.pageSize,
        totalPages: Math.ceil(count / query.pagination.pageSize),
        totalResults: count,
      }
      return data
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  async saveFile(data: File[]): Promise<IFile[]> {
    try {
      const createItems = await this.fileModel.insertMany(data)
      return createItems
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }
}
