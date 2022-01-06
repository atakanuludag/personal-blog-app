import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MongooseModule } from '@nestjs/mongoose'

import { IEnv } from './common/interfaces/env.interface'

//Modules
import { CategoryModule } from './category/category.module'
import { UserModule } from './user/user.module'
import { TagModule } from './tag/tag.module'
import { ArticleModule } from './article/article.module'
import { FileModule } from './file/file.module'
import { SettingsModule } from './settings/settings.module'

import * as moment from 'moment'
import 'moment/locale/tr'
moment.locale('tr')

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService<IEnv>) => ({
        uri: configService.get<string>('MONGODB_URI'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      }),
      inject: [ConfigService],
    }),
    CategoryModule,
    UserModule,
    TagModule,
    ArticleModule,
    FileModule,
    SettingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
