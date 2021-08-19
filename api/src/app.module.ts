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
    ArticleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}