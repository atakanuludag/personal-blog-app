import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { ESettings } from '../interfaces/Enum'

export type SettingsDocument = Settings & Document

@Schema()
export class Settings {
  @Prop({ type: ESettings, required: true, unique: true, enum: ESettings })
  name: ESettings

  @Prop({ required: true })
  value: string
}

export const SettingsSchema = SchemaFactory.createForClass(Settings)
