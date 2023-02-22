import axios from '@/core/Axios'
import ListQueryModel from '@/models/ListQueryModel'

const serviceBaseUrl = `/tag`

const TagService = {
  getItems: async (params?: ListQueryModel) =>
    axios
      .get(`${serviceBaseUrl}`, {
        params,
      })
      .then((res) => res.data),
}

Object.freeze(TagService)

export default TagService
