import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';

import { Article, ArticleSchema } from './schemas/article.schema';

import { CoreMessage, ArticleMessage } from '../common/messages';
import { ExceptionHelper } from '../common/helpers/exception.helper';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Article.name, schema: ArticleSchema }
    ]),
  ],
  controllers: [ArticleController],
  providers: [CoreMessage, ArticleMessage, ExceptionHelper, ArticleService]
})
export class ArticleModule {}
