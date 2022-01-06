import { QueryClient, useQuery, useQueryClient } from 'react-query'
import ArticleService from '@/services/ArticleService'

export default function useArticleQuery() {
  const service = new ArticleService()
  const queryClient = new QueryClient()
  //const queryClient = useQueryClient()
  const queryName = 'articles'

  const articleQuery = () => useQuery([queryName], () => service.getItems)

  const articlePreFetchQuery = () =>
    queryClient.prefetchQuery(queryName, service.getItems)

  //const invalidateArticleQuery = () => queryClient.invalidateQueries(queryName)

  return { articleQuery, articlePreFetchQuery }
}
