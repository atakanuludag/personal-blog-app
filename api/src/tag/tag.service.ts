import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, ObjectId } from 'mongoose'
import { ITag } from './interfaces/tag.interface'
import { Tag, TagDocument } from './schemas/tag.schema'
import { TagDto } from './dto/tag.dto'
import { UpdateTagDto } from './dto/update-tag.dto'
import { ExceptionHelper } from '../common/helpers/exception.helper'
import { CoreMessage } from '../common/messages'

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

  async getItems(): Promise<ITag[]> {
    try {
      const items = await this.serviceModel.find().sort('-title').exec()
      return items
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
