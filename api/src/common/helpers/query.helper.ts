import { Query } from '@nestjs/common'
import { IQuery, OrderType } from '../interfaces/query.interface'

export class QueryHelper {
  public constructor() {}

  public instance(@Query() query): IQuery {
    const s: string = query.s
    let searchQuery = {}
    const search = s ? s.toLocaleLowerCase() : null
    const searchType = query.sType ? query.sType : null
    if (search && searchType)
      searchQuery = { [searchType]: { $regex: `^${search}`, $options: '$i' } }

    const orderName = query.order ? query.order : 'createdAt'
    const orderType = query.orderBy ? query.orderBy : OrderType.DESC
    const order = { [orderName]: orderType }

    const pageSize = query.pageSize ? parseInt(query.pageSize) : 10
    const page = query.page ? parseInt(query.page) : 1
    const skip = pageSize * page - pageSize

    const q: IQuery = {
      searchQuery,
      order: order,
      pagination: {
        pageSize,
        page,
        skip,
      },
    }
    return q
  }
}
