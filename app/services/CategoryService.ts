import axios from '@/core/Axios'
import CategoryModel from '@/models/CategoryModel'

const serviceBaseUrl = `/category`

const CategoryService = {
  getItems: async (): Promise<CategoryModel[]> =>
    axios.get(`${serviceBaseUrl}`).then((res) => res.data),
}

Object.freeze(CategoryService)

export default CategoryService
