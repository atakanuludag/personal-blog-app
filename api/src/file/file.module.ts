import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer'

import { IEnv } from '@/common/interfaces/env.interface'

import { FileController } from '@/file/file.controller'
import { FileService } from '@/file/file.service'
import { File, FileSchema } from '@/file/schemas/file.schema'

import { CoreMessage, FileMessage } from '@/common/messages'
import { ExceptionHelper } from '@/common/helpers/exception.helper'
import { editFileName } from '@/common/utils/edit-file-name.util'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: File.name, schema: FileSchema }]),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService<IEnv>) => ({
        storage: diskStorage({
          destination: configService.get<string>('UPLOAD_FOLDER'),
          filename: editFileName,
        }),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [FileController],
  providers: [FileService, ExceptionHelper, CoreMessage, FileMessage],
})
export class FileModule {}
