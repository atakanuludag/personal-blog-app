import { UseQueryOptions, useQuery } from 'react-query'
import { QUERY_NAMES } from '@/core/Constants'
import PageService from '@/services/PageService'
import ListQueryModel from '@/models/ListQueryModel'
import PageModel from '@/models/PageModel'

export default function usePageQuery() {
  const service = PageService
  const queryName = QUERY_NAMES.PAGE

  const pageItemsQuery = (params?: ListQueryModel) =>
    useQuery([queryName, params], () => service.getItems(params))

  const pageItemQuery = (
    id: string,
    options?: Omit<UseQueryOptions<PageModel>, 'queryKey' | 'queryFn'>,
  ) => useQuery([queryName, id], () => service.getItemById(id), options)

  const pageGetByGuidQuery = (guid: string) =>
    useQuery([queryName], () => service.getItemByGuid(guid))

  return {
    pageItemsQuery,
    pageItemQuery,
    pageGetByGuidQuery,
  }
}
