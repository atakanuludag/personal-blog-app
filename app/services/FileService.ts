import axios from '@/core/Axios'
import ListResponseModel from '@/models/ListResponseModel'
import FileModel, { FileListQueryModel, FileForm } from '@/models/FileModel'

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
  deleteItem: async (id: string): Promise<void> => {
    try {
      await axios.delete(`${serviceBaseUrl}/${id}`)
    } catch (err) {
      console.log('[FileService] deleteItem() Error: ', err)
    }
  },
  uploadFile: async (file: File, path: string | null): Promise<FileModel[]> => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      if (path) formData.append('path', path)

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
