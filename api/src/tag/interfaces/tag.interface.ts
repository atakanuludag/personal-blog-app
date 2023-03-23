import { Document } from 'mongoose'

export interface ITag extends Document {
  readonly title: string
  readonly guid: string
}
