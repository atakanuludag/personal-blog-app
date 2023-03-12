import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type FileDocument = File & Document

@Schema({
  timestamps: true,
})
export class File {
  @Prop({ required: false, default: false })
  isFolder: boolean

  @Prop({ required: true })
  title: string

  @Prop({ required: false })
  description: string

  @Prop({ required: false })
  filename: string

  @Prop({ required: true })
  path: string

  @Prop({ required: false })
  mimetype: string

  @Prop({ required: false })
  size: number

  @Prop({ required: true })
  folderPath: string
}

export const FileSchema = SchemaFactory.createForClass(File)
