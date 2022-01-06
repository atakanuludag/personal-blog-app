import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { SettingsController } from './settings.controller'
import { Settings, SettingsSchema } from './schemas/settings.schema'
import { SettingsService } from './settings.service'

import { CoreMessage } from '../common/messages'
import { ExceptionHelper } from '../common/helpers/exception.helper'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Settings.name, schema: SettingsSchema },
    ]),
  ],
  controllers: [SettingsController],
  providers: [ExceptionHelper, CoreMessage, SettingsService],
})
export class SettingsModule {}
