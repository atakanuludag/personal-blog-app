import { Document, ObjectId } from 'mongoose'

export interface ICategory extends Document {
  readonly title: string
  readonly description: string
  readonly guid: string
  readonly parent: ObjectId | null
}
