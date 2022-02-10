import IListResponse from '@/models/IListResponse'
import ICategory from '@/models/ICategory'
import ITag from '@/models/ITag'
import { ArticleType } from '@/models/enums'

export default interface IArticle {
  readonly id: string
  readonly title: string
  readonly shortDescription: string
  readonly content: string
  readonly guid: string
  readonly publishingDate: Date
  readonly categories: ICategory[]
  readonly tags: ITag[]
  readonly articleType: ArticleType
  readonly coverImage: string
  readonly isShow: boolean
  readonly viewCount: number
  readonly likeCount: number
  readonly createdAt: Date
  readonly updatedAt: Date
}

export interface IArticleResponse extends IListResponse {
  results: IArticle[]
}
