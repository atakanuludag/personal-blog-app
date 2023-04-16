import axios from '@/core/Axios'
import ArticleModel, { ArticleListQueryModel } from '@/models/ArticleModel'
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
            readingTimeMin: Math.round(readingTime(item.content).minutes),
          })),
        }
      }

      return data.map((item: ArticleModel) => ({
        ...item,
        readingTimeMin: Math.round(readingTime(item.content).minutes),
      }))
    } catch (err) {
      return null
    }
  },
  getItemByGuid: async (guid: string): Promise<ArticleModel | null> => {
    try {
      const ret = await axios.get(`${serviceBaseUrl}/getByGuid/${guid}`)
      const { data } = ret
      return {
        ...data,
        readingTimeMin: Math.round(readingTime(data.content).minutes),
      }
    } catch (err) {
      return null
    }
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
}

Object.freeze(ArticleService)

export default ArticleService
