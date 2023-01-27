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
  const service = ArticleService
  const queryName = QUERY_NAMES.ARTICLE

  const articleQuery = () =>
    useQuery([queryName, params], () => service.getItems(params))

  const articleInfiniteQuery = () =>
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

  const articlePrefetchInfiniteQuery = (queryClient: QueryClient) =>
    queryClient.prefetchInfiniteQuery([queryName], () =>
      service.getItems(params),
    )

  const invalidateArticleQuery = () => {
    const queryClientHook = useQueryClient()
    queryClientHook.invalidateQueries(queryName)
  }

  return {
    articleQuery,
    articleInfiniteQuery,
    articlePrefetchInfiniteQuery,
    invalidateArticleQuery,
  }
}
