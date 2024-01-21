import { Query } from '@nestjs/common'
import { ListQueryDto } from '@/common/dto/list-query.dto'
import { IQuery } from '@/common/interfaces/query.interface'
import { OrderType } from '@/common/interfaces/enums'
import { FilterQuery, isValidObjectId } from 'mongoose'
export class QueryHelper {
  public constructor() {}

  public instance(@Query() query: ListQueryDto): IQuery {
    let searchQuery: FilterQuery<any> = {}

    if (query?.s && query?.sType) {
      const isObjectId = isValidObjectId(query?.s)

      if (query.s === 'null') {
        searchQuery = { [query.sType]: null }
      } else if (isObjectId) {
        searchQuery = { [query.sType]: query?.s }
      } else {
        const sTypeArr = query?.sType.split(',').map((s) => s.trim())
        searchQuery = {
          $or: [],
        }
        sTypeArr.forEach((s) => {
          searchQuery['$or'].push({
            [s]: { $regex: `${query.s.toLocaleLowerCase()}`, $options: 'i' },
          })
        })
      }
    }
    const orderName = query.order || 'createdAt'
    const orderType =
      typeof query.orderBy !== 'undefined' && query.orderBy.toString() !== ''
        ? Number(query.orderBy)
        : OrderType.DESC
    const order = { [orderName]: orderType }

    const q: IQuery = {
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
