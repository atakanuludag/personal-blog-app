import { useQuery, UseQueryOptions } from 'react-query'
import { QUERY_NAMES } from '@/core/Constants'
import TagService from '@/services/TagService'
import ListQueryModel from '@/models/ListQueryModel'
import TagModel from '@/models/TagModel'
import ListResponseModel from '@/models/ListResponseModel'

export default function useTagQuery(params?: ListQueryModel) {
  const service = TagService
  const queryName = QUERY_NAMES.TAG

  //https://github.com/TanStack/query/discussions/1195
  const tagQuery = (
    options?: UseQueryOptions<
      ListResponseModel<TagModel[]> | TagModel[] | null,
      TagModel,
      ListResponseModel<TagModel[]> | TagModel[] | null,
      any
    >,
  ) => useQuery([queryName, params], () => service.getItems(params), options)

  return {
    tagQuery,
  }
}
