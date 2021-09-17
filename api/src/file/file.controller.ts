import { Body, Controller, Get, HttpStatus, Post, Query, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { CoreMessage, FileMessage } from '../common/messages';
import { IFile } from './interfaces/file.interface';
import { File } from './schemas/file.schema';
import { ExceptionHelper } from 'src/common/helpers/exception.helper';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ListQueryDto } from 'src/common/dto/list-query.dto';
import { QueryHelper } from 'src/common/helpers/query.helper';

@Controller('file')
export class FileController {
    constructor(
        private readonly service: FileService,
        private readonly coreMessage: CoreMessage,
        private readonly fileMessage: FileMessage,
        private readonly queryHelper: QueryHelper
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async list(@Query() query: ListQueryDto) {
        const q = this.queryHelper.instance(query);
        return await this.service.getItems(q);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    @UseInterceptors(FilesInterceptor('file'))
    uploadFile(@UploadedFiles() file: Express.Multer.File[]) {

        try {
            let data = new Array<File>();

            data = file.map(f => {
                return {
                    title: f.filename,
                    description: "",
                    filename: f.filename,
                    path: f.path,
                    mimetype: f.mimetype,
                    size: f.size
                }
            });
            return this.service.saveFile(data);
        } catch (err) {
            throw new ExceptionHelper(this.fileMessage.UPLOAD_ERROR, HttpStatus.BAD_REQUEST);
        }
    }




}
