import axios from '@/core/Axios'
import IPage, { PageListResponseModel } from '@/models/PageModel'
import ListQueryModel from '@/models/ListQueryModel'
import { AxiosResponse } from 'axios'

const getItems = async (
  params?: ListQueryModel,
): Promise<PageListResponseModel | IPage[]> => {
  try {
    const ret = await axios.get(`/page`, {
      params,
    })
    const { data } = ret
    return data
  } catch (err) {
    console.log('[PageService] getItems() Error: ', err)
    return {} as any
  }
}

const getItemByGuid = async (guid: string): Promise<IPage> => {
  try {
    const ret = await axios.get(`/page/getByGuid/${guid}`)
    return ret.data
  } catch (err) {
    console.log('[PageService] getItemByGuid() Error: ', err)
    return {} as any
  }
}

const service = {
  getItems,
  getItemByGuid,
}

export default service
