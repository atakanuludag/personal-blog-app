import { Injectable } from '@nestjs/common'
import {
  ServeStaticModuleOptions,
  ServeStaticModuleOptionsFactory,
} from '@nestjs/serve-static'
import { ConfigService } from '@nestjs/config'
import { IEnv } from '@/common/interfaces/env.interface'

@Injectable()
export class ServeStaticConfigurationService
  implements ServeStaticModuleOptionsFactory
{
  constructor(private configService: ConfigService<IEnv>) {}

  createLoggerOptions():
    | ServeStaticModuleOptions[]
    | Promise<ServeStaticModuleOptions[]> {
    return [
      {
        rootPath: this.configService.get('UPLOAD_FOLDER_PATH'),
        serveRoot: this.configService.get('UPLOAD_FOLDER_PATH'),
        exclude: ['/api*'],
        // rootPath: './uploads',
        // serveRoot: '/uploads',
        // exclude: ['/api*'],
      },
    ]
  }
}
