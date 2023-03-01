import { useQuery } from 'react-query'
import { QUERY_NAMES } from '@/core/Constants'
import CategoryService from '@/services/CategoryService'
import ListQueryModel from '@/models/ListQueryModel'

export default function useCategoryQuery(params?: ListQueryModel) {
  const service = CategoryService
  const queryName = QUERY_NAMES.CATEGORY

  const categoriesQuery = () =>
    useQuery([queryName, params], () => service.getItems(params))

  return {
    categoriesQuery,
  }
}
