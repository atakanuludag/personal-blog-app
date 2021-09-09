import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { FileController } from './file.controller';
import { FileService } from './file.service';
import { File, FileSchema } from './schemas/file.schema';

import { CoreMessage } from '../common/messages';

import { editFileName } from 'src/common/utils/edit-file-name.util';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: File.name, schema: FileSchema }
    ]),
    MulterModule.register({
      //dest: './uploads',
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName
      })
    }),
  ],
  controllers: [FileController],
  providers: [FileService, CoreMessage]
})
export class FileModule {}
