import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type PageDocument = Page & Document

@Schema({
  timestamps: true,
})
export class Page {
  @Prop({ required: true })
  title: string

  @Prop({ required: true })
  shortDescription: string

  @Prop({ required: true })
  content: string

  @Prop({ required: true })
  guid: string

  @Prop({ default: Date.now })
  publishingDate: Date

  @Prop({ default: true })
  isShow: boolean

  @Prop({ default: 0 })
  viewCount: number
}

export const PageSchema = SchemaFactory.createForClass(Page)
