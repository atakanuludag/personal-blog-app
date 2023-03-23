import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type TagDocument = Tag & Document

@Schema({
  timestamps: true,
})
export class Tag {
  @Prop({ required: true })
  title: string

  @Prop({ required: true, unique: true })
  guid: string
}

export const TagSchema = SchemaFactory.createForClass(Tag)
