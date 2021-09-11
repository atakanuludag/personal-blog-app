import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { EnvironmentVariables } from '../common/interfaces/environment-variables.interface';

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
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService<EnvironmentVariables>) => ({
        storage: diskStorage({
          destination: configService.get<string>('UPLOAD_FOLDER'),
          filename: editFileName
        })
      }),
      inject: [ConfigService],
    })
  ],
  controllers: [FileController],
  providers: [FileService, CoreMessage]
})
export class FileModule {}
