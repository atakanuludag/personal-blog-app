import { IListQueryResponse } from '@/common/interfaces/query.interface'
import { IFile } from '@/file/interfaces/file.interface'

export interface IFileList extends IListQueryResponse {
  results: IFile[]
}
