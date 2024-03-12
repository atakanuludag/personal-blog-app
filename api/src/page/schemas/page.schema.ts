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

  @Prop({
    default: [],
    required: false,
  })
  viewIPs: string[]

  // Virtual;
  viewCount: number
}

export const PageSchema = SchemaFactory.createForClass(Page)

// PageSchema.virtual('viewCount').get(function () {
//   return this.viewIPs.length
// })

PageSchema.set('toJSON', {
  transform: function (doc, ret: PageDocument) {
    const data = {
      ...ret,
      viewCount: ret.viewIPs ? ret.viewIPs.length : 0,
    }
    delete data.viewIPs
    return data
  },
})
