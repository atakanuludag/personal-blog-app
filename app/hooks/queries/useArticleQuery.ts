import {
  QueryClient,
  useQueryClient,
  useInfiniteQuery,
  useQuery,
} from 'react-query'
import { QUERY_NAMES } from '@/core/Constants'
import ArticleService from '@/services/ArticleService'
import ListQueryModel from '@/models/ListQueryModel'
import { ArticleListResponseModel } from '@/models/ArticleModel'

export default function useArticleQuery(params?: ListQueryModel) {
  const service = ArticleService
  const queryName = QUERY_NAMES.ARTICLE

  const articleQuery = () =>
    useQuery([queryName, params], () => service.getItems(params))

  const articleInfiniteQuery = () =>
    useInfiniteQuery(
      [queryName],
      ({ pageParam }) =>
        service.getItems({
          ...params,
          page: pageParam,
        }) as any,
      {
        getNextPageParam: (lastPage: ArticleListResponseModel) => {
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
