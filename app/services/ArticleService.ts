import axios, { AxiosError } from '../core/Axios'
import IArticle, { IArticleResponse } from '@/models/IArticle'
import IListQuery from '@/models/IListQuery'
/*import IDHItem from '../interfaces/IDHItem'
import ILoginForm from '../interfaces/ILoginForm'
import IAuth from '../interfaces/IAuth'
import IServiceResponse from '../interfaces/IServiceResponse'
*/

/*
export const initialItemValue: IDHItem = {
    id: "",
    title: "",
    content:  "",
    date: "",
    guid: "",
    link: "",
    previewLink: "",
    topicId: "",
    likeCount: 0
}*/

export default class ArticleService {
  private itemToModel = (item: any): IArticle => {
    const {
      _id,
      title,
      shortDescription,
      content,
      guid,
      publishingDate,
      isShow,
      viewCount,
      likeCount,
    } = item

    return {
      id: _id,
      title,
      shortDescription,
      content,
      guid,
      publishingDate,
      coverImage: item.coverImage ? item.coverImage.path : '',
      isShow,
      viewCount,
      likeCount,
    }
  }

  getItems = async (params?: IListQuery): Promise<IArticleResponse> => {
    let items = new Array<IArticle>()
    try {
      const ret = await axios.get(`/article`, {
        params,
      })

      const { data } = ret
      items = data.results.map(this.itemToModel)

      return {
        totalResults: data.totalResults,
        totalPages: data.totalPages,
        pageSize: data.pageSize,
        currentPage: data.currentPage,
        currentPageSize: data.currentPageSize,
        hasNextPage: data.hasNextPage,
        results: items,
      }
    } catch (err) {
      //const error: AxiosError = err;
      console.log('[ArticleService] getItems() Error: ', err)
      return {} as any
    }
  }
}
