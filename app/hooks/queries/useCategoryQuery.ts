import { useQuery } from 'react-query'
import { QUERY_NAMES } from '@/core/Constants'
import CategoryService from '@/services/CategoryService'

export default function useCategoryQuery() {
  const service = CategoryService
  const queryName = QUERY_NAMES.CATEGORY

  const categoriesQuery = () => useQuery([queryName], () => service.getItems())

  return {
    categoriesQuery,
  }
}
