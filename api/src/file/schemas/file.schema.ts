import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, ObjectId } from 'mongoose'
import * as mongoose from 'mongoose'

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

  @Prop({ required: false, default: null })
  path: string

  @Prop({
    required: false,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File',
    default: null,
  })
  folderId: ObjectId | null

  @Prop({ required: false })
  mimetype: string

  @Prop({ required: false })
  size: number
}

export const FileSchema = SchemaFactory.createForClass(File)
