import { useQuery } from 'react-query'
import { QUERY_NAMES } from '@/core/Constants'
import PageService from '@/services/PageService'
import ListQueryModel from '@/models/ListQueryModel'

export default function usePageQuery() {
  const service = PageService
  const queryName = QUERY_NAMES.PAGE

  const pageQuery = (enabled: boolean = true, params?: ListQueryModel) =>
    useQuery([queryName, params], () => service.getItems(params), {
      enabled,
    })

  const pageGetByGuidQuery = (guid: string) =>
    useQuery([queryName], () => service.getItemByGuid(guid))

  return {
    pageQuery,
    pageGetByGuidQuery,
  }
}
