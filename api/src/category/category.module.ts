import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { Category, CategorySchema } from './schemas/category.schema';

import { CoreMessage, CategoryMessage } from '../common/messages';
import { ExceptionHelper } from '../common/helpers/exception.helper';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema }
    ]),
  ],
  controllers: [CategoryController],
  providers: [ExceptionHelper, CoreMessage, CategoryMessage, CategoryService],
})

export class CategoryModule { }