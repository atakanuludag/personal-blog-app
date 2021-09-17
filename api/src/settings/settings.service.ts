import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ISettings } from './interfaces/settings.interface';
import { Settings, SettingsDocument } from './schemas/settings.schema';
import { SettingsDto } from './dto/settings.dto';
import { ExceptionHelper } from '../common/helpers/exception.helper';
import { CoreMessage } from '../common/messages';
import { ESettings } from './interfaces/Enum';

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(Settings.name) private readonly settingsModel: Model<SettingsDocument>,
    private readonly coreMessage: CoreMessage
  ) { }

  async post(data: SettingsDto[] | SettingsDto): Promise<ISettings | ISettings[]> {
    try {
      if (Array.isArray(data)) {
        let response = [];
        for (let item of data) {
          response.push(
            await this.settingsModel.findOneAndUpdate({ name: item.name }, { value: item.value }, {
              upsert: true,
              new: true
            })
          );
        }
        return response;
      } else {
        return await this.settingsModel.findOneAndUpdate({ name: data.name }, { value: data.value }, {
          upsert: true,
          new: true
        });
      }
    } catch (err) {
      throw new ExceptionHelper(this.coreMessage.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getByName(name: ESettings): Promise<ISettings> {
    try {
      return await this.settingsModel.findOne({ name }).exec();
    } catch (err) {
      throw new ExceptionHelper(this.coreMessage.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getItems(): Promise<ISettings[]> {
    try {
      return await this.settingsModel.find().exec();
    } catch (err) {
      throw new ExceptionHelper(this.coreMessage.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}