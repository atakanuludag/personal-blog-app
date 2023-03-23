import { Injectable } from '@nestjs/common'
import {
  ServeStaticModuleOptions,
  ServeStaticModuleOptionsFactory,
} from '@nestjs/serve-static'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { IEnv } from '@/common/interfaces/env.interface'
import { join } from 'path'

@Injectable()
export class ServeStaticConfigurationService
  implements ServeStaticModuleOptionsFactory
{
  constructor(private configurationService: ConfigService<IEnv>) {}

  createLoggerOptions():
    | ServeStaticModuleOptions[]
    | Promise<ServeStaticModuleOptions[]> {
    return [
      {
        //rootPath: join(__dirname, '..', 'uploads'),
        rootPath: './uploads',
        serveRoot: '/uploads',
        exclude: ['/api*'],
      },
    ]
  }
}
