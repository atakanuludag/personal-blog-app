import axios from '@/core/Axios'
import ListQueryModel from '@/models/ListQueryModel'

const serviceBaseUrl = `tag`

const TagService = {
  getItems: async (params?: ListQueryModel) =>
    axios
      .get(`/${serviceBaseUrl}`, {
        params,
      })
      .then((res) => res.data),
}

Object.freeze(TagService)

export default TagService

// const itemToModel = (item: any): ArticleModel => {
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

// const getItems = async (params?: ListQueryModel): Promise<ArticleModelResponse> => {
//   let items = new Array<ArticleModel>()
//   try {
//     const ret = await axios.get(`/article`, {
//       params,
//     })

//     const { data } = ret
//     items = data.results.map(itemToModel)

//     return {
//       totalResults: data.totalResults,
//       totalPages: data.totalPages,
//       pageSize: data.pageSize,
//       currentPage: data.currentPage,
//       currentPageSize: data.currentPageSize,
//       hasNextPage: data.hasNextPage,
//       results: items,
//     }
//   } catch (err) {
//     //const error: AxiosError = err;
//     console.log('[ArticleService] getItems() Error: ', err)
//     return {} as any
//   }
// }

// const getItemByGuid = async (guid: string): Promise<ArticleModel> => {
//   try {
//     const ret = await axios.get(`/article/getByGuid/${guid}`)
//     return itemToModel(ret.data)
//   } catch (err) {
//     //const error: AxiosError = err;
//     console.log('[ArticleService] getItemByGuid() Error: ', err)
//     return {} as any
//   }
// }

// const getLikeIPCheck = async (guid: string, ip: string): Promise<boolean> => {
//   try {
//     const res = await axios.get(`/article/likeIpCheck/${guid}`, {
//       params: {
//         ip,
//       },
//     })
//     return typeof res.data !== 'undefined' ? res.data : true
//   } catch (err) {
//     console.log('[ArticleService] getLikeIPCheck() Error: ', err)
//     return true
//   }
// }

// const likePost = async (id: string): Promise<number> => {
//   try {
//     const res = await axios.post(`/article/like/${id}`)
//     return typeof res.data !== 'undefined' ? res.data : 0
//   } catch (err) {
//     console.log('[ArticleService] likePost() Error: ', err)
//     return 0
//   }
// }

// const service = {
//   getItems,
//   getItemByGuid,
//   getLikeIPCheck,
//   likePost,
// }

// export default service
