import { IListQueryResponse } from '../../common/interfaces/query.interface'
import { IPage } from './page.interface'

export interface IPageList extends IListQueryResponse {
  results: IPage[]
}
