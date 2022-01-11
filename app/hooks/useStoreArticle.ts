import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AppState from '@/store/appState'
import { setParams } from '@/store/article/actions'
import IListQuery from '@/models/IListQuery'

export default function useStoreArticle() {
  const dispatch = useDispatch()

  const articleParams = useSelector(
    (state: AppState) => state.articleReducers.params,
  )

  const setArticleParams = useCallback(
    (data: IListQuery) => dispatch(setParams(data)),
    [dispatch],
  )

  return { articleParams, setArticleParams }
}
