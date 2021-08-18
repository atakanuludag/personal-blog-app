import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document, ObjectId } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, unique: true })
  guid: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Category" })
  parentCategory: ObjectId;

  @Prop({ default: Date.now })
  createdDate: Date;

  @Prop({ default: Date.now })
  updatedDate: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category);