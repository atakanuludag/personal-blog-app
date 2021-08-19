import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITag } from './interfaces/tag.interface';
import { Tag, TagDocument } from './schemas/tag.schema';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { ExceptionHelper } from '../common/helpers/exception.helper';
import { CoreMessage } from '../common/messages';

@Injectable()
export class TagService {
    constructor(
        @InjectModel(Tag.name) private readonly tagModel: Model<TagDocument>,
        private readonly coreMessage: CoreMessage
    ) { }

    async create(data: CreateTagDto): Promise<ITag> {
        try {
            const create = new this.tagModel(data);
            return create.save();
        } catch (err) {
            throw new ExceptionHelper(this.coreMessage.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async update(body: UpdateTagDto, _id: string): Promise<void> {
        try {
            await this.tagModel.updateOne({ _id }, {
                $set: body
            });
        } catch (err) {
            throw new ExceptionHelper(this.coreMessage.BAD_REQUEST, HttpStatus.BAD_REQUEST);
        }
    }

    async getItems(): Promise<ITag[]> {
        try {
            const items = await this.tagModel.find().sort('-title').exec();
            return items;
        } catch (err) {
            throw new ExceptionHelper(this.coreMessage.BAD_REQUEST, HttpStatus.BAD_REQUEST);
        }
    }

    async getItemById(_id: string): Promise<ITag> {
        try {
            return await this.tagModel.findOne({ _id }).exec();
        } catch (err) {
            throw new ExceptionHelper(this.coreMessage.BAD_REQUEST, HttpStatus.BAD_REQUEST);
        }
    }

    async getItemByGuid(guid: string): Promise<ITag> {
        try {
            return await this.tagModel.findOne({ guid }).exec();
        } catch (err) {
            throw new ExceptionHelper(this.coreMessage.BAD_REQUEST, HttpStatus.BAD_REQUEST);
        }
    }

    async guidExists(guid: string): Promise<any> {
        try {
            return await this.tagModel.exists({ guid });
        } catch (err) {
            throw new ExceptionHelper(this.coreMessage.BAD_REQUEST, HttpStatus.BAD_REQUEST);
        }
    }
}
