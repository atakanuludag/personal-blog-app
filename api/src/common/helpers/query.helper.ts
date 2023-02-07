import { Query } from '@nestjs/common'
import { ListQueryDto } from '@/common/dto/list-query.dto'
import { IQuery, OrderType } from '@/common/interfaces/query.interface'

export class QueryHelper {
  public constructor() {}

  public instance(@Query() query: ListQueryDto): IQuery {
    const s: string = query.s
    let searchQuery = {}
    const search = s ? s.toLocaleLowerCase() : null
    const searchType = query.sType ? query.sType : null
    if (search && searchType)
      searchQuery = { [searchType]: { $regex: `^${search}`, $options: '$i' } }

    const orderName = query.order ? query.order : 'createdAt'
    const orderType = query.orderBy ? query.orderBy : OrderType.DESC
    const order = { [orderName]: orderType }

    let q: IQuery = {
      paging: false,
      searchQuery,
      order: order,
    }

    if (
      (Number(query.paging) === 1 || typeof query.paging === 'undefined') &&
      query.pageSize &&
      query.page
    ) {
      const pageSize = query.pageSize ? Number(query.pageSize) : 10
      const page = query.page ? Number(query.page) : 1
      const skip = pageSize * page - pageSize

      q.paging = true
      q.pagination = {
        pageSize,
        page,
        skip,
      }
    }

    return q
  }
}
