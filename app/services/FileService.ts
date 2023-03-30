import axios from '@/core/Axios'
import ListResponseModel from '@/models/ListResponseModel'
import FileModel, { FileListQueryModel, FileForm } from '@/models/FileModel'
import { BaseServiceErrorModel } from '@/models/ServiceBaseModel'
//todo: BaseServiceErrorModel her yere eklenecek.
const serviceBaseUrl = `/file`

const FileService = {
  getItems: async (
    params?: FileListQueryModel,
  ): Promise<ListResponseModel<FileModel[]> | FileModel[] | null> =>
    axios
      .get(`${serviceBaseUrl}`, {
        params,
      })
      .then((res) => res.data),
  deleteItem: async (id: string): Promise<void | BaseServiceErrorModel> =>
    axios.delete(`${serviceBaseUrl}/${id}`),
  createFolder: async (title: string, path: string | null): Promise<void> => {
    try {
      await axios.post(`${serviceBaseUrl}/folder`, { title, path: path || '/' })
    } catch (err) {
      console.log('[FileService] createFolder() Error: ', err)
    }
  },
  uploadFile: async (file: File, path: string | null): Promise<FileModel[]> => {
    try {
      const formData = new FormData()
      // ** Path datası en üstte verilmeli. Yoksa api tarafındaki multer'da sıkıntı çıkartıyor.
      if (path) formData.append('path', path)
      formData.append('file', file)

      const res = await axios.post(`${serviceBaseUrl}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return res?.data || []
    } catch (err) {
      console.log('[FileService] uploadFile() Error: ', err)
      return []
    }
  },
  patchItem: async (data: FileForm): Promise<void> =>
    axios.patch(`${serviceBaseUrl}/${data._id}`, data),
}

Object.freeze(FileService)

export default FileService
