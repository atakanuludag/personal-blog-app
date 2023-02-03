import { OrderType } from './enums'
export default interface IListQuery {
  pageSize?: number
  page?: number
  order?: string
  orderBy?: OrderType
  s?: string
  sType?: string
}
