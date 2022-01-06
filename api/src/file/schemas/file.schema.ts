import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type FileDocument = File & Document

@Schema({
  timestamps: true,
})
export class File {
  @Prop({ required: false })
  title: string

  @Prop({ required: false })
  description: string

  @Prop({ required: true })
  filename: string

  @Prop({ required: true })
  path: string

  @Prop({ required: true })
  mimetype: string

  @Prop({ required: true })
  size: number
}

export const FileSchema = SchemaFactory.createForClass(File)
