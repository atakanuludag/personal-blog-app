import { Document, ObjectId } from 'mongoose'

export interface IArticle extends Document {
  readonly title: string
  readonly shortDescription: string
  readonly content: string
  readonly guid: string
  readonly publishingDate: Date
  readonly categories: ObjectId[]
  readonly tags: ObjectId[]
  readonly coverImage: ObjectId
  readonly isShow: boolean
  readonly viewCount: number
  readonly likeCount: number
}
