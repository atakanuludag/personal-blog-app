import axios from '@/core/Axios'
import ArticleModel, {
  ArticleFormModel,
  ArticleListQueryModel,
} from '@/models/ArticleModel'
import ListResponseModel from '@/models/ListResponseModel'
import readingTime from 'reading-time'

const serviceBaseUrl = `/article`

const ArticleService = {
  getItems: async (
    params?: ArticleListQueryModel,
  ): Promise<ListResponseModel<ArticleModel[]> | ArticleModel[] | null> => {
    try {
      const ret = await axios.get(`${serviceBaseUrl}`, {
        params,
      })
      const { data } = ret
      // ** paging model
      if (data.results) {
        return {
          ...data,
          results: data.results.map((item: ArticleModel) => ({
            ...item,
            readingTimeMin: 10,
            //readingTimeMin: Math.round(readingTime(item.content).minutes),
          })),
        }
      }

      return data.map((item: ArticleModel) => ({
        ...item,
        readingTimeMin: 10,
        //readingTimeMin: Math.round(readingTime(item.content).minutes),
      }))
    } catch (err) {
      console.log('err', err)
      return null
    }
  },
  postItem: async (data: ArticleFormModel): Promise<void> =>
    await axios.post(`${serviceBaseUrl}`, data),
  patchItem: async (data: ArticleFormModel): Promise<void> =>
    await axios.patch(`${serviceBaseUrl}/${data._id}`, data),
  getItemByGuid: async (guid: string): Promise<ArticleModel | null> => {
    try {
      const ret = await axios.get(`${serviceBaseUrl}/getByGuid/${guid}`)
      const { data } = ret
      return {
        ...data,
        readingTimeMin: 10,
        //readingTimeMin: Math.round(readingTime(data.content).minutes),
      }
    } catch (err) {
      return null
    }
  },
  getItemById: async (id: string): Promise<ArticleModel> => {
    const ret = await axios.get(`${serviceBaseUrl}/getById/${id}`)
    return ret.data
  },
  getLikeIPCheck: async (guid: string, ip: string): Promise<boolean> => {
    try {
      const res = await axios.get(`/article/likeIpCheck/${guid}`, {
        params: {
          ip,
        },
      })
      return typeof res.data !== 'undefined' ? res.data : true
    } catch (err) {
      console.log('[ArticleService] getLikeIPCheck() Error: ', err)
      return true
    }
  },
  likePost: async (id: string): Promise<number> => {
    try {
      const res = await axios.post(`${serviceBaseUrl}/like/${id}`)
      return typeof res.data !== 'undefined' ? res.data : 0
    } catch (err) {
      console.log('[ArticleService] likePost() Error: ', err)
      return 0
    }
  },
  deleteItem: async (id: string): Promise<void> => {
    try {
      await axios.delete(`${serviceBaseUrl}/${id}`)
    } catch (err) {
      console.log('[ArticleService] deleteItem() Error: ', err)
    }
  },
  guidExists: async (guid: string): Promise<boolean> =>
    axios
      .get(`${serviceBaseUrl}/guidExists/${guid}`)
      .then((res) => res.data.exists),
}

Object.freeze(ArticleService)

export default ArticleService
