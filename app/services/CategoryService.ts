import axios from '@/core/Axios'
import CategoryModel from '@/models/CategoryModel'

const serviceBaseUrl = `/category`

const CategoryService = {
  getItems: async (): Promise<CategoryModel[]> =>
    axios.get(`${serviceBaseUrl}`).then((res) => res.data),
  guidExists: async (guid: string): Promise<boolean> =>
    axios
      .get(`${serviceBaseUrl}/guidExists/${guid}`)
      .then((res) => res.data.exists),
}

Object.freeze(CategoryService)

export default CategoryService
