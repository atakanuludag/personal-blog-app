import { Query } from '@nestjs/common'
import { IQuery, OrderBy } from '../interfaces/query.interface'

export class QueryHelper {
  public constructor() {}

  public instance(@Query() query): IQuery {
    let searchQuery = {}
    const search = query.s ? query.s : null
    const searchType = query.sType ? query.sType : null
    if (search && searchType)
      searchQuery = { [searchType]: { $regex: search, $options: '$i' } }

    const orderName = query.order ? query.order : 'updatedDate'
    const orderBy = query.orderBy ? query.orderBy : OrderBy.DESC
    const order = { [orderName]: orderBy }

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
