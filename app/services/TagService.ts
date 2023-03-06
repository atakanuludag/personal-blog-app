import axios from '@/core/Axios'
import ListQueryModel from '@/models/ListQueryModel'
import ListResponseModel from '@/models/ListResponseModel'
import TagModel from '@/models/TagModel'

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
}

Object.freeze(TagService)

export default TagService
