import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { Tag, TagSchema } from './schemas/tag.schema';

import { CoreMessage, TagMessage } from '../common/messages';
import { ExceptionHelper } from '../common/helpers/exception.helper';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Tag.name, schema: TagSchema }
    ]),
  ],
  controllers: [TagController],
  providers: [ExceptionHelper, CoreMessage, TagMessage, TagService]
})
export class TagModule {}