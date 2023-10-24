import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { Document, ObjectId } from 'mongoose'

export type CategoryDocument = Category & Document

@Schema({
  timestamps: true,
})
export class Category {
  @Prop({ required: true })
  title: string

  @Prop({ required: true })
  description: string

  @Prop({ required: true, unique: true })
  guid: string

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null,
  })
  parent: ObjectId

  @Prop({ required: true })
  order: number
}

export const CategorySchema = SchemaFactory.createForClass(Category)
