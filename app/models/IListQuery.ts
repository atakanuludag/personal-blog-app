import { OrderBy } from './enums'
export default interface IListQuery {
  pageSize: number
  page: number
  order?: string
  orderBy?: OrderBy
  s?: string
  sType?: string
}
