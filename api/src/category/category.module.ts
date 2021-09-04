import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { Category, CategorySchema } from './schemas/category.schema';

import { ArticleService } from '../article/article.service';
import { Article, ArticleSchema } from '../article/schemas/article.schema';

import { CoreMessage, CategoryMessage } from '../common/messages';
import { ExceptionHelper } from '../common/helpers/exception.helper';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema }
    ]),
    MongooseModule.forFeature([
      { name: Article.name, schema: ArticleSchema }
    ])
  ],
  controllers: [CategoryController],
  providers: [ExceptionHelper, CoreMessage, CategoryMessage, CategoryService, ArticleService],
})

export class CategoryModule { }