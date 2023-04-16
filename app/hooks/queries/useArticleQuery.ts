import {
  QueryClient,
  useQueryClient,
  useInfiniteQuery,
  useQuery,
} from 'react-query'
import { QUERY_NAMES } from '@/core/Constants'
import ArticleService from '@/services/ArticleService'
import { ArticleListQueryModel } from '@/models/ArticleModel'

export default function useArticleQuery(params?: ArticleListQueryModel) {
  const service = ArticleService
  const queryName = QUERY_NAMES.ARTICLE

  const articleQuery = () =>
    useQuery([queryName, params], () => service.getItems(params))

  const invalidateArticleQuery = () => {
    const queryClientHook = useQueryClient()
    queryClientHook.invalidateQueries(queryName)
  }

  return {
    articleQuery,
    invalidateArticleQuery,
  }
}
