import axios from '@/core/Axios'
import IPage, { IPageResponse } from '@/models/IPage'
import IListQuery from '@/models/IListQuery'

const getItems = async (params?: IListQuery): Promise<IPageResponse> => {
  let items = new Array<IPage>()
  try {
    const ret = await axios.get(`/page`, {
      params,
    })
    const { data } = ret

    return {
      totalResults: data.totalResults,
      totalPages: data.totalPages,
      pageSize: data.pageSize,
      currentPage: data.currentPage,
      currentPageSize: data.currentPageSize,
      hasNextPage: data.hasNextPage,
      results: data.results,
    }
  } catch (err) {
    console.log('[PageService] getItems() Error: ', err)
    return {} as any
  }
}

const getItemByGuid = async (guid: string): Promise<IPage> => {
  try {
    const ret = await axios.get(`/article/getByGuid/${guid}`)
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
