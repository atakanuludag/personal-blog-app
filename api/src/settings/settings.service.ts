import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { ISettings } from '@/settings/interfaces/settings.interface'
import { Settings, SettingsDocument } from '@/settings/schemas/settings.schema'
import { SettingsDto } from '@/settings/dto/settings.dto'
import { ExceptionHelper } from '@/common/helpers/exception.helper'
import { CoreMessage } from '@/common/messages'
import { ESettings, ESettingsType } from '@/settings/interfaces/Enum'
import { SettingsInitialData } from '@/settings/data/initial.data'

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(Settings.name)
    private readonly serviceModel: Model<SettingsDocument>,
    private readonly coreMessage: CoreMessage,
  ) {}

  async post(data: SettingsDto[]): Promise<ISettings[]> {
    try {
      let response = []
      for (let item of data) {
        response.push(
          await this.serviceModel.findOneAndUpdate(
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
      return await this.serviceModel.findOne({ name }).exec()
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  async getItems(): Promise<ISettings[]> {
    try {
      return await this.serviceModel.find().exec()
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  async setInitialItems(): Promise<void> {
    try {
      for (const key of Object.keys(ESettings) as Array<
        keyof typeof ESettings
      >) {
        const find = await this.serviceModel
          .findOne({ name: ESettings[key] })
          .exec()
        if (!find) {
          const create = new this.serviceModel({
            name: ESettings[key],
            title: SettingsInitialData[key].title,
            value: SettingsInitialData[key].value,
            type: ESettingsType[key],
          })
          await create.save()
        }
      }
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      )
    }
  }
}
