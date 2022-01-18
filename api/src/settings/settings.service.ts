import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { ISettings } from './interfaces/settings.interface'
import { Settings, SettingsDocument } from './schemas/settings.schema'
import { SettingsDto } from './dto/settings.dto'
import { ExceptionHelper } from '../common/helpers/exception.helper'
import { CoreMessage } from '../common/messages'
import { ESettings, ESettingsInitialData } from './interfaces/Enum'

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(Settings.name)
    private readonly settingsModel: Model<SettingsDocument>,
    private readonly coreMessage: CoreMessage,
  ) {}

  async post(data: SettingsDto[]): Promise<ISettings[]> {
    try {
      let response = []
      for (let item of data) {
        response.push(
          await this.settingsModel.findOneAndUpdate(
            { name: item.name },
            { value: item.value },
            {
              upsert: true,
              new: true,
            },
          ),
        )
      }
      return response
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  async getByName(name: ESettings): Promise<ISettings> {
    try {
      return await this.settingsModel.findOne({ name }).exec()
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  async getItems(): Promise<ISettings[]> {
    try {
      return await this.settingsModel.find().exec()
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  async setInitialItems(): Promise<void> {
    try {
      ;(Object.keys(ESettings) as Array<keyof typeof ESettings>).map(
        async (key: ESettings) => {
          const count = await this.settingsModel
            .find({ name: key })
            .countDocuments()
          if (count <= 0) {
            const create = new this.settingsModel({
              name: key,
              value: ESettingsInitialData[key],
            })
            await create.save()
          }
        },
      )
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      )
    }
  }
}
