import { ArticleActionType, SetItemsAction, SetParamsAction } from './types'
import IArticle from '@/models/IArticle'
import IListQuery from '@/models/IListQuery'

export const setItems = (data: IArticle[]): SetItemsAction => ({
  type: ArticleActionType.SET_ITEMS,
  data,
})

export const setParams = (data: IListQuery): SetParamsAction => ({
  type: ArticleActionType.SET_PARAMS,
  data,
})
