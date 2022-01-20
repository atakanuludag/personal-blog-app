//import { Action } from 'redux'
import { ArticleActionType, ArticleState, ArticleActions } from './types'
import IArticle from '@/models/IArticle'

const initialState: ArticleState = {
  items: new Array<IArticle>(),
  params: {
    pageSize: 2,
    page: 1,
  },
}

const article = (
  state: ArticleState = initialState,
  action: ArticleActions,
): ArticleState => {
  switch (action.type) {
    case ArticleActionType.SET_ITEMS:
      return { ...state, items: action.data }
    case ArticleActionType.SET_PARAMS:
      return { ...state, params: action.data }
    default:
      return state
  }
}

export default article
