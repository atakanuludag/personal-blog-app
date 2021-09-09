import { Body, Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { CoreMessage } from '../common/messages';
import { IFile } from './interfaces/file.interface';
import { File } from './schemas/file.schema';

@Controller('file')
export class FileController {
    constructor(
        private readonly service: FileService,
        private readonly coreMessage: CoreMessage,
    ) { }

    @Post()
    @UseInterceptors(FilesInterceptor('file'))
    uploadFile(@UploadedFiles() file: Express.Multer.File[]) {

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
    }


}
