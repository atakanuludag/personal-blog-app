import { applyMiddleware, combineReducers, createStore } from 'redux'
import logger from 'redux-logger'
import InitialState from '@/store/initialState'

import articleReducers from '@/store/article/reducers'
import settingsReducers from '@/store/settings/reducers'

export const reducer = combineReducers<InitialState>({
  articleReducers,
  settingsReducers,
})

const configureStore = (initialState?: InitialState) =>
  createStore(reducer, initialState, applyMiddleware(logger))

const store = configureStore()

export default store
