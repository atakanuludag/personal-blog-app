import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document, ObjectId } from 'mongoose';
import { ArticleType } from '../../common/interfaces/enums';

export type ArticleDocument = Article & Document;

@Schema({
  timestamps: true,
})

export class Article {

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  shortDescription: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  guid: string;

  @Prop({ default: Date.now })
  publishingDate: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Category" })
  categories: ObjectId[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Tag" })
  tags: ObjectId[];

  @Prop({ type: ArticleType, default: ArticleType.PAGE })
  articleType: ArticleType;

  @Prop({ default: true })
  isShow: boolean;

  @Prop({ default: 0 })
  viewCount: number;

  @Prop({ default: 0 })
  likeCount: number;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);