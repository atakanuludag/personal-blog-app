import axios from '@/core/Axios'
import PageModel, { PageFormModel } from '@/models/PageModel'
import ListQueryModel from '@/models/ListQueryModel'
import ListResponseModel from '@/models/ListResponseModel'

const serviceBaseUrl = `/page`

const PageService = {
  getItems: async (
    params?: ListQueryModel,
  ): Promise<ListResponseModel<PageModel[]> | PageModel[]> => {
    const ret = await axios.get(`${serviceBaseUrl}`, {
      params,
    })
    const { data } = ret
    return data
  },
  postItem: async (data: PageFormModel): Promise<void> =>
    await axios.post(`${serviceBaseUrl}`, data),
  patchItem: async (data: PageFormModel): Promise<void> =>
    await axios.patch(`${serviceBaseUrl}/${data._id}`, data),
  getItemByGuid: async (guid: string): Promise<PageModel | null> => {
    const ret = await axios.get(`${serviceBaseUrl}/getByGuid/${guid}`)
    return ret.data
  },
  getItemById: async (id: string): Promise<PageModel> => {
    const ret = await axios.get(`${serviceBaseUrl}/getById/${id}`)
    return ret?.data
  },
}

Object.freeze(PageService)

export default PageService
