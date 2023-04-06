import CategoryModel from '@/models/CategoryModel'
import TagModel from '@/models/TagModel'
import { ArticleType } from '@/models/enums'
import FileModel from '@/models/FileModel'

export default interface ArticleModel {
  readonly _id: string
  readonly title: string
  readonly shortDescription: string
  readonly content: string
  readonly guid: string
  readonly publishingDate: Date
  readonly categories: CategoryModel[]
  readonly tags: TagModel[]
  readonly articleType: ArticleType
  readonly coverImage: FileModel
  readonly isShow: boolean
  readonly viewCount: number
  readonly likedCount: number
  readonly createdAt: Date
  readonly updatedAt: Date
  readonly readingTimeMin: number
}

export type ArticleFormModel = {
  readonly title: string
  readonly shortDescription: string
  readonly content: string
  readonly guid: string
  readonly publishingDate: Date
  readonly categories: string[]
  readonly tags: string[]
  readonly coverImage: string
  readonly isShow: boolean
}
