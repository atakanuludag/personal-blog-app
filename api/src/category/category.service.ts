import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { ICategory } from './interfaces/category.interface';
import { Category, CategoryDocument } from './schemas/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ExceptionHelper } from '../common/helpers/exception.helper';
import { CoreMessage } from '../common/messages';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<CategoryDocument>,
    private readonly coreMessage: CoreMessage
  ) { }

  async create(data: CreateCategoryDto): Promise<ICategory> {
    try {
      const create = new this.categoryModel(data);
      return create.save();
    } catch (err) {
      throw new ExceptionHelper(this.coreMessage.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(body: UpdateCategoryDto, _id: ObjectId): Promise<void> {
    try {
      await this.categoryModel.updateOne({ _id }, {
        $set: body
      });
    } catch (err) {
      throw new ExceptionHelper(this.coreMessage.BAD_REQUEST, HttpStatus.BAD_REQUEST);
    }
  }

  async getItems(): Promise<ICategory[]> {
    try {
      const items = await this.categoryModel.find().populate("parent").sort('-title').exec();
      return items;
    } catch (err) {
      throw new ExceptionHelper(this.coreMessage.BAD_REQUEST, HttpStatus.BAD_REQUEST);
    }
  }

  async getItemById(_id: ObjectId): Promise<ICategory> {
    try {
      return await this.categoryModel.findOne({ _id }).populate("parent").exec();
    } catch (err) {
      throw new ExceptionHelper(this.coreMessage.BAD_REQUEST, HttpStatus.BAD_REQUEST);
    }
  }

  async getItemByGuid(guid: string): Promise<ICategory> {
    try {
      return await this.categoryModel.findOne({ guid }).populate("parent").exec();
    } catch (err) {
      throw new ExceptionHelper(this.coreMessage.BAD_REQUEST, HttpStatus.BAD_REQUEST);
    }
  }

  async guidExists(guid: string): Promise<boolean> {
    try {
      return await this.categoryModel.exists({ guid });
    } catch (err) {
      throw new ExceptionHelper(this.coreMessage.BAD_REQUEST, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: ObjectId): Promise<void> {
    try {
      await this.categoryModel.deleteOne({ _id: id });
    } catch (err) {
      throw new ExceptionHelper(this.coreMessage.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async parentExists(parent: ObjectId): Promise<boolean> {
    try {
      return await this.categoryModel.exists({ parent });
    } catch (err) {
      throw new ExceptionHelper(this.coreMessage.BAD_REQUEST, HttpStatus.BAD_REQUEST);
    }
  }

}