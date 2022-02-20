import { useQuery } from 'react-query'
import { QUERY_NAMES } from '@/core/Constants'
import PageService from '@/services/PageService'
import IListQuery from '@/models/IListQuery'

export default function usePageQuery() {
  const service = PageService
  const queryName = QUERY_NAMES.PAGE

  const pageQuery = (enabled: boolean = true, params?: IListQuery) =>
    useQuery([queryName, params], () => service.getItems(params), {
      enabled,
    })

  return {
    pageQuery,
  }
}
