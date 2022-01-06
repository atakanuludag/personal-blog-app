import { QueryClient, useQuery, useQueryClient } from 'react-query'
import ArticleService from '@/services/ArticleService'
import { QUERY_NAMES } from '@/core/Constants'

export default function useArticleQuery() {
  const service = new ArticleService()
  const queryName = QUERY_NAMES.ARTICLES

  const articleQuery = () => useQuery([queryName], () => service.getItems())

  const articlePreFetchQuery = (queryClient: QueryClient) => queryClient.prefetchQuery(queryName, service.getItems)

  const invalidateArticleQuery = () => {
    const queryClientHook = useQueryClient()
    queryClientHook.invalidateQueries(queryName)
  }

  return { articleQuery, articlePreFetchQuery, invalidateArticleQuery }
}
