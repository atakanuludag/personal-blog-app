import { Document, ObjectId, PopulatedDoc } from 'mongoose'
import { ICategory } from '@/category/interfaces/category.interface'
import { IFile } from '@/file/interfaces/file.interface'
import { ITag } from '@/tag/interfaces/tag.interface'

export interface IArticle extends Document {
  readonly title: string
  readonly shortDescription: string
  readonly content: string
  readonly guid: string
  readonly publishingDate: Date
  readonly categories: ObjectId[] | PopulatedDoc<ICategory>[]
  readonly tags: ObjectId[] | PopulatedDoc<ITag>[]
  readonly coverImage?: ObjectId | PopulatedDoc<IFile>
  readonly isShow: boolean
  readonly viewIPs?: string[]
  readonly likedIPs?: string[]
  readonly viewCount: number
  readonly likedCount: number
}
