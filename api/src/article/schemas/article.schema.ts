import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { Document, ObjectId } from 'mongoose'

export type ArticleDocument = Article & Document

@Schema({
  timestamps: true,
})
export class Article {
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

  @Prop({
    required: true,
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Category',
  })
  categories: ObjectId[]

  @Prop({ required: true, type: [mongoose.Schema.Types.ObjectId], ref: 'Tag' })
  tags: ObjectId[]

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File',
    default: null,
    required: false,
  })
  coverImage?: ObjectId

  @Prop({ default: true })
  isShow: boolean

  @Prop({ default: [], required: false })
  viewIPs: string[]

  @Prop({ default: [], required: false })
  likedIPs: string[]

  // Virtual;
  viewCount: number

  // Virtual;
  likedCount: number
}

export const ArticleSchema = SchemaFactory.createForClass(Article)

ArticleSchema.set('toJSON', {
  transform: function (doc, ret: ArticleDocument) {
    const data = {
      ...ret,
      viewCount: ret.viewIPs ? ret.viewIPs.length : 0,
      likedCount: ret.likedIPs ? ret.likedIPs.length : 0,
    }
    delete data.viewIPs
    delete data.likedIPs
    return data
  },
})
