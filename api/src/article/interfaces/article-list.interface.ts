import { IListQueryResponse } from '@/common/interfaces/query.interface'
import { IArticle } from '@/article/interfaces/article.interface'

export interface IArticleList extends IListQueryResponse {
  results: IArticle[]
}
