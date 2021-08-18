import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICategory } from './interfaces/category.interface';
import { Category, CategoryDocument } from './schemas/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
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

  async getItems(): Promise<ICategory[]> {
    try {
      const items = await this.categoryModel.find().populate("parentCategory").sort('-title').exec();
      return items;
    } catch (err) {
      throw new ExceptionHelper(this.coreMessage.BAD_REQUEST, HttpStatus.BAD_REQUEST);
    }
  }

  async getItemById(_id: string): Promise<ICategory> {
    try {
      return await this.categoryModel.findOne({ _id }).populate("parentCategory").exec();
    } catch (err) {
      throw new ExceptionHelper(this.coreMessage.BAD_REQUEST, HttpStatus.BAD_REQUEST);
    }
  }

  async getItemByGuid(guid: string): Promise<ICategory> {
    try {
      return await this.categoryModel.findOne({ guid }).populate("parentCategory").exec();
    } catch (err) {
      throw new ExceptionHelper(this.coreMessage.BAD_REQUEST, HttpStatus.BAD_REQUEST);
    }
  }

  async guidExists(guid: string): Promise<any> {
    try {
      return await this.categoryModel.exists({ guid });
    } catch (err) {
      throw new ExceptionHelper(this.coreMessage.BAD_REQUEST, HttpStatus.BAD_REQUEST);
    }
  }
}