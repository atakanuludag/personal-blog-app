import axios from '@/core/Axios'
import CategoryModel from '@/models/CategoryModel'
import ListQueryModel from '@/models/ListQueryModel'
import ListResponseModel from '@/models/ListResponseModel'

const serviceBaseUrl = `/category`

const CategoryService = {
  getItems: async (
    params?: ListQueryModel,
  ): Promise<ListResponseModel<CategoryModel[]> | CategoryModel[] | null> =>
    axios
      .get(`${serviceBaseUrl}`, {
        params,
      })
      .then((res) => res.data),
  guidExists: async (guid: string): Promise<boolean> =>
    axios
      .get(`${serviceBaseUrl}/guidExists/${guid}`)
      .then((res) => res.data.exists),
  deleteItem: async (id: string): Promise<void> =>
    axios.delete(`${serviceBaseUrl}/${id}`),
}

Object.freeze(CategoryService)

export default CategoryService
