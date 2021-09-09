import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Config } from './app.config';

//Modules
import { CategoryModule } from './category/category.module';
import { UserModule } from './user/user.module';
import { TagModule } from './tag/tag.module';
import { ArticleModule } from './article/article.module';
import { FileModule } from './file/file.module';

import * as moment from 'moment';
import 'moment/locale/tr';
moment.locale("tr");

@Module({
  imports: [
    MongooseModule.forRoot(Config.mongoDbConnectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex:true
    }),
    CategoryModule,
    UserModule,
    TagModule,
    ArticleModule,
    FileModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}