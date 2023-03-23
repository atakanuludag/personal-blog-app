import { useQuery } from 'react-query'
import { QUERY_NAMES } from '@/core/Constants'
import FileService from '@/services/FileService'
import { FileListQueryModel } from '@/models/FileModel'

export default function useCategoryQuery(params?: FileListQueryModel) {
  const service = FileService
  const queryName = QUERY_NAMES.FILES

  const filesQuery = () =>
    useQuery([queryName, params], () => service.getItems(params))

  return {
    filesQuery,
  }
}
