import { QueryClient, useQuery, useQueryClient } from 'react-query'
import { QUERY_NAMES } from '@/core/Constants'
import ArticleService from '@/services/ArticleService'
import IListQuery from '@/models/IListQuery'
//import useStoreArticle from '@/hooks/useStoreArticle'

export default function useArticleQuery(params: IListQuery) {
  const service = new ArticleService()
  console.log('params', params)
  const queryName = QUERY_NAMES.ARTICLES

  //const { params } = useStoreArticle()

  //console.log('params', params)

  const articleQuery = () =>
    useQuery([queryName, params], () => service.getItems(params))

  const articlePreFetchQuery = (queryClient: QueryClient) =>
    queryClient.prefetchQuery(queryName, () => service.getItems(params))

  const invalidateArticleQuery = () => {
    const queryClientHook = useQueryClient()
    queryClientHook.invalidateQueries(queryName)
  }

  return { articleQuery, invalidateArticleQuery, articlePreFetchQuery }
}
