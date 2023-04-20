import {
  QueryClient,
  useQueryClient,
  useInfiniteQuery,
  useQuery,
} from 'react-query'
import { QUERY_NAMES } from '@/core/Constants'
import FileService from '@/services/FileService'
import FileModel, { FileListQueryModel } from '@/models/FileModel'
import ListResponseModel from '@/models/ListResponseModel'

export default function useCategoryQuery(params?: FileListQueryModel) {
  const service = FileService
  const queryName = QUERY_NAMES.FILES

  const filesQuery = () =>
    useQuery([queryName, params], () => service.getItems(params))

  const filesInfiniteQuery = () =>
    useInfiniteQuery(
      [queryName],
      ({ pageParam }) =>
        service.getItems({
          ...params,
          page: pageParam,
        }) as any,
      {
        getNextPageParam: (lastPage: ListResponseModel<FileModel[]>) => {
          return lastPage.hasNextPage
        },
      },
    )

  return {
    filesQuery,
    filesInfiniteQuery,
  }
}
