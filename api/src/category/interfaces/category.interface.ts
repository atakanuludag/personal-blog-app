import { Document, ObjectId, PopulatedDoc } from 'mongoose'

export interface ICategory extends Document {
  readonly title: string
  readonly description: string
  readonly guid: string
  readonly parent: ObjectId | PopulatedDoc<ICategory>[] | null
}
