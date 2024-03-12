import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AppController } from '@/app.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { ServeStaticModule } from '@nestjs/serve-static'
import { IEnv } from '@/common/interfaces/env.interface'
// ** modules
import { GlobalModule } from '@/global.module'
import { CategoryModule } from '@/category/category.module'
import { UserModule } from '@/user/user.module'
import { TagModule } from '@/tag/tag.module'
import { ArticleModule } from '@/article/article.module'
import { FileModule } from '@/file/file.module'
import { PageModule } from '@/page/page.module'
import { ReportModule } from '@/report/report.module'
import { ServeStaticConfigurationModule } from '@/serve-static-config/serve-static-config.module'

// ** services
import { ServeStaticConfigurationService } from '@/serve-static-config/serve-static-config.service'

import * as moment from 'moment'
import 'moment/locale/tr'
moment.locale('tr')

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRootAsync({
      imports: [ServeStaticConfigurationModule],
      useExisting: ServeStaticConfigurationService,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService<IEnv>) => ({
        uri: configService.get('MONGODB_URI'),
        dbName: configService.get('MONGODB_DB_NAME'),
        auth: {
          username: configService.get('MONGODB_DB_USER'),
          password: configService.get('MONGODB_DB_PASS'),
        },
        // useNewUrlParser: true,
        socketTimeoutMS: 0,
        connectTimeoutMS: 0,
        serverSelectionTimeoutMS: 0,
        // useCreateIndex: true,
        // useFindAndModify: false,
      }),
      inject: [ConfigService],
    }),
    GlobalModule,
    CategoryModule,
    UserModule,
    TagModule,
    ArticleModule,
    FileModule,
    PageModule,
    ReportModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
