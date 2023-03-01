import axios from '@/core/Axios'
import PageModel from '@/models/PageModel'
import ListQueryModel from '@/models/ListQueryModel'
import ListResponseModel from '@/models/ListResponseModel'

const serviceBaseUrl = `/page`

const PageService = {
  getItems: async (
    params?: ListQueryModel,
  ): Promise<ListResponseModel<PageModel[]> | PageModel[] | null> => {
    try {
      const ret = await axios.get(`${serviceBaseUrl}`, {
        params,
      })
      const { data } = ret
      return data
    } catch (err) {
      console.log('[PageService] getItems() Error: ', err)
      return null
    }
  },
  getItemByGuid: async (guid: string): Promise<PageModel | null> => {
    try {
      const ret = await axios.get(`${serviceBaseUrl}/getByGuid/${guid}`)
      return ret.data
    } catch (err) {
      console.log('[PageService] getItemByGuid() Error: ', err)
      return null
    }
  },
}

Object.freeze(PageService)

export default PageService
