import { applyMiddleware, combineReducers, createStore } from 'redux'
import logger from 'redux-logger'
import articleReducers from '@/store/article/reducers'
import InitialState from '@/store/initialState'

export const reducer = combineReducers<InitialState>({
  articleReducers,
})

const configureStore = (initialState?: InitialState) =>
  createStore(reducer, initialState, applyMiddleware(logger))

const store = configureStore()

export default store
