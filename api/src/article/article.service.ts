import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IArticle } from './interfaces/article.interface';
import { Article, ArticleDocument } from './schemas/article.schema';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ExceptionHelper } from '../common/helpers/exception.helper';
import { CoreMessage } from '../common/messages';

@Injectable()
export class ArticleService {
    constructor(
        @InjectModel(Article.name) private readonly articleModel: Model<ArticleDocument>,
        private readonly coreMessage: CoreMessage
    ) { }

    async create(data: CreateArticleDto): Promise<IArticle> {
        try {
            const create = new this.articleModel(data);
            return create.save();
        } catch (err) {
            throw new ExceptionHelper(this.coreMessage.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async update(body: UpdateArticleDto, _id: string): Promise<void> {
        try {
            await this.articleModel.updateOne({ _id }, {
                $set: body
            });
        } catch (err) {
            throw new ExceptionHelper(this.coreMessage.BAD_REQUEST, HttpStatus.BAD_REQUEST);
        }
    }

    async getItems(): Promise<IArticle[]> {
        try {
            const items = await this.articleModel.find().sort('-title').exec();
            return items;
        } catch (err) {
            throw new ExceptionHelper(this.coreMessage.BAD_REQUEST, HttpStatus.BAD_REQUEST);
        }
    }

    async getItemById(_id: string): Promise<IArticle> {
        try {
            return await this.articleModel.findOne({ _id }).exec();
        } catch (err) {
            throw new ExceptionHelper(this.coreMessage.BAD_REQUEST, HttpStatus.BAD_REQUEST);
        }
    }

    async getItemByGuid(guid: string): Promise<IArticle> {
        try {
            return await this.articleModel.findOne({ guid }).exec();
        } catch (err) {
            throw new ExceptionHelper(this.coreMessage.BAD_REQUEST, HttpStatus.BAD_REQUEST);
        }
    }

    async guidExists(guid: string): Promise<any> {
        try {
            return await this.articleModel.exists({ guid });
        } catch (err) {
            throw new ExceptionHelper(this.coreMessage.BAD_REQUEST, HttpStatus.BAD_REQUEST);
        }
    }
}
