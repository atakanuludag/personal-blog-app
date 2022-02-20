import ILocalStorage from '@/models/ILocalStroge'

const THEME_SETTINGS = {
  DRAWER_WITDH: 280,
}

const QUERY_NAMES = {
  ARTICLE: 'article',
  PAGE: 'page',
  SETTINGS: 'settings',
}

const LS_DARK_MODE: ILocalStorage = {
  key: 'DARK_MODE',
}

const LOCAL_STORAGES = {
  LS_DARK_MODE,
}

export { THEME_SETTINGS, QUERY_NAMES, LOCAL_STORAGES }
