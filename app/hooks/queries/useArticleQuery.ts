import {
  QueryClient,
  useQueryClient,
  useInfiniteQuery,
  useQuery,
} from 'react-query'
import { QUERY_NAMES } from '@/core/Constants'
import ArticleService from '@/services/ArticleService'
import IListQuery from '@/models/IListQuery'

export default function useArticleQuery(params?: IListQuery) {
  const service = new ArticleService()
  const queryName = QUERY_NAMES.ARTICLE

  const articleQuery = () =>
    useInfiniteQuery(
      [queryName],
      ({ pageParam }) =>
        service.getItems(
          params && {
            ...params,
            page: pageParam,
          },
        ),
      {
        getNextPageParam: (lastPage) => {
          return lastPage.hasNextPage
        },
      },
    )

  const articlePreFetchQuery = (queryClient: QueryClient) =>
    queryClient.prefetchInfiniteQuery([queryName], () =>
      service.getItems(params),
    )

  const articleGetByGuidQuery = (guid: string) =>
    useQuery([queryName], () => service.getItemByGuid(guid))

  const articleByGuidPreFetchQuery = (queryClient: QueryClient, guid: string) =>
    queryClient.prefetchQuery([queryName], () => service.getItemByGuid(guid))

  const invalidateArticleQuery = () => {
    const queryClientHook = useQueryClient()
    queryClientHook.invalidateQueries(queryName)
  }

  return {
    articleQuery,
    articlePreFetchQuery,
    articleGetByGuidQuery,
    articleByGuidPreFetchQuery,
    invalidateArticleQuery,
  }
}
