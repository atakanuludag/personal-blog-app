import axios from '@/core/Axios'
import IArticle, { IArticleResponse } from '@/models/IArticle'
import IListQuery from '@/models/IListQuery'
import readingTime from 'reading-time'

// const itemToModel = (item: any): IArticle => {
//   const {
//     _id,
//     title,
//     shortDescription,
//     content,
//     guid,
//     publishingDate,
//     categories,
//     tags,
//     articleType,
//     isShow,
//     viewCount,
//     likedCount,
//     createdAt,
//     updatedAt,
//   } = item

//   const stats = readingTime(content)

//   return {
//     id: _id,
//     title,
//     shortDescription,
//     content,
//     guid,
//     publishingDate,
//     categories,
//     tags,
//     articleType,
//     coverImage: item.coverImage ? item.coverImage.path : '',
//     isShow,
//     viewCount,
//     likedCount,
//     createdAt,
//     updatedAt,
//     readingTimeMin: Math.round(stats.minutes),
//   }
// }

const getItems = async (
  params?: IListQuery,
): Promise<IArticleResponse | IArticle[]> => {
  try {
    const ret = await axios.get(`/article`, {
      params,
    })
    const { data } = ret
    return data
  } catch (err) {
    //Todo: return olarak boş object göndermek yerine null gönderilip /[guid] sayfası test edilecek.
    //const error: AxiosError = err;
    //console.log('[ArticleService] getItems() Error: ', err)
    return {} as any
  }
}

const getItemByGuid = async (guid: string): Promise<IArticle> => {
  try {
    const ret = await axios.get(`/article/getByGuid/${guid}`)
    return ret.data
    //return itemToModel(ret.data)
  } catch (err) {
    //const error: AxiosError = err;
    //console.log('[ArticleService] getItemByGuid() Error: ', err)
    return {} as any
  }
}

const getLikeIPCheck = async (guid: string, ip: string): Promise<boolean> => {
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
}

const likePost = async (id: string): Promise<number> => {
  try {
    const res = await axios.post(`/article/like/${id}`)
    return typeof res.data !== 'undefined' ? res.data : 0
  } catch (err) {
    console.log('[ArticleService] likePost() Error: ', err)
    return 0
  }
}

const deleteItem = async (id: string): Promise<void> => {
  try {
    await axios.delete(`/article/${id}`)
  } catch (err) {
    console.log('[ArticleService] deleteItem() Error: ', err)
  }
}

const service = {
  getItems,
  getItemByGuid,
  getLikeIPCheck,
  likePost,
  deleteItem,
}

export default service
