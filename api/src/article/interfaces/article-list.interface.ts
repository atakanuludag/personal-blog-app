import { IListQueryResponse } from '../../common/interfaces/query.interface'
import { IArticle } from './article.interface'

export interface IArticleList extends IListQueryResponse {
  results: IArticle[]
}
