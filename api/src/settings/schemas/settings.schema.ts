import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import * as mongoose from 'mongoose'
import { ESettings } from '@/settings/interfaces/Enum'
import { ValueType } from '@/common/interfaces/enums'

export type SettingsDocument = Settings & Document

@Schema()
export class Settings {
  @Prop({ type: ESettings, required: true, unique: true, enum: ESettings })
  name: ESettings

  @Prop({ required: true })
  title: string

  @Prop({ type: mongoose.Schema.Types.Mixed, required: true })
  value: any

  @Prop({ type: ValueType, required: true, enum: ValueType })
  type: ValueType
}

export const SettingsSchema = SchemaFactory.createForClass(Settings)
