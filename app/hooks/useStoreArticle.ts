import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AppState from '@/store/appState'
import { setParams } from '@/store/article/actions'
import IListQuery from '@/models/IListQuery'

export default function useStoreArticle() {
  const dispatch = useDispatch()

  const articleParamsStore = useSelector(
    (state: AppState) => state.articleReducers.params,
  )

  const setArticleParamsStore = useCallback(
    (data: IListQuery) => dispatch(setParams(data)),
    [dispatch],
  )

  return { articleParamsStore, setArticleParamsStore }
}
