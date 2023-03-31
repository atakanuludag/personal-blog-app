import axios from '@/core/Axios'
import ListQueryModel from '@/models/ListQueryModel'
import ListResponseModel from '@/models/ListResponseModel'
import TagModel, { TagFormModel } from '@/models/TagModel'

const serviceBaseUrl = `/tag`

const TagService = {
  getItems: async (
    params?: ListQueryModel,
  ): Promise<ListResponseModel<TagModel[]> | TagModel[] | null> =>
    axios
      .get(`${serviceBaseUrl}`, {
        params,
      })
      .then((res) => res.data),
  deleteItem: async (id: string): Promise<void> => {
    try {
      await axios.delete(`${serviceBaseUrl}/${id}`)
    } catch (err) {
      console.log('[TagService] deleteItem() Error: ', err)
    }
  },
  guidExists: async (guid: string): Promise<boolean> =>
    axios
      .get(`${serviceBaseUrl}/guidExists/${guid}`)
      .then((res) => res.data.exists),
  postItem: async (data: TagFormModel): Promise<void> =>
    axios.post(`${serviceBaseUrl}`, data),
  patchItem: async (data: TagFormModel): Promise<void> =>
    axios.patch(`${serviceBaseUrl}/${data._id}`, data),
}

Object.freeze(TagService)

export default TagService
