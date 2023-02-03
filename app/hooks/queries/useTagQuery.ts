import { QueryKey, useQuery, UseQueryOptions } from 'react-query'
import { QUERY_NAMES } from '@/core/Constants'
import TagService from '@/services/TagService'
import IListQuery from '@/models/IListQuery'

export default function useTagQuery(params?: IListQuery) {
  const service = TagService
  const queryName = QUERY_NAMES.TAG

  //https://github.com/TanStack/query/discussions/1195
  const tagQuery = <T = any>(
    options?: UseQueryOptions<T, any, QueryKey, any>,
  ) => useQuery([queryName, params], () => service.getItems(params), options)

  return {
    tagQuery,
  }
}
