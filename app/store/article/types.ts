import { Action } from 'redux'
import IArticle from '@/models/IArticle'
import IListQuery from '@/models/IListQuery'

export interface ArticleState {
  items: IArticle[]
  currentPageItems: IArticle[]
  params: IListQuery
}

export enum ArticleActionType {
  SET_ITEMS = 'SET_ITEMS',
  SET_PARAMS = 'SET_PARAMS',
}

export interface SetItemsAction extends Action {
  type: ArticleActionType.SET_ITEMS
  data: IArticle[]
}

export interface SetParamsAction extends Action {
  type: ArticleActionType.SET_PARAMS
  data: IListQuery
}

export type ArticleActions = SetItemsAction | SetParamsAction
