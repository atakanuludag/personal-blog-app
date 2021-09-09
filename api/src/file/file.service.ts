import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { IFile } from './interfaces/file.interface';
import { File, FileDocument } from './schemas/file.schema';
//import { CreateCategoryDto } from './dto/create-category.dto';
//import { UpdateCategoryDto } from './dto/update-category.dto';
import { ExceptionHelper } from '../common/helpers/exception.helper';
import { CoreMessage } from '../common/messages';

@Injectable()
export class FileService {

    constructor(
        @InjectModel(File.name) private readonly fileModel: Model<FileDocument>,
        private readonly coreMessage: CoreMessage
    ) { }

    async saveFile(data: File[]): Promise<IFile[]> {
        try {
            const createItems = await this.fileModel.insertMany(data);
            return createItems;
        } catch (err) {
            throw new ExceptionHelper(this.coreMessage.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
