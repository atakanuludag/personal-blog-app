import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AppController } from '@/app.controller'
import { MongooseModule } from '@nestjs/mongoose'

import { IEnv } from '@/common/interfaces/env.interface'

//Modules
import { GlobalModule } from '@/global.module'
import { CategoryModule } from '@/category/category.module'
import { UserModule } from '@/user/user.module'
import { TagModule } from '@/tag/tag.module'
import { ArticleModule } from '@/article/article.module'
import { FileModule } from '@/file/file.module'
import { SettingsModule } from '@/settings/settings.module'
import { PageModule } from '@/page/page.module'
import { ReportModule } from '@/report/report.module'

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
        socketTimeoutMS: 0,
        connectTimeoutMS: 0,
        useCreateIndex: true,
        useFindAndModify: false,
      }),
      inject: [ConfigService],
    }),
    GlobalModule,
    CategoryModule,
    UserModule,
    TagModule,
    ArticleModule,
    FileModule,
    SettingsModule,
    PageModule,
    ReportModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
