import ILocalStorage from '@/models/ILocalStroge'

const THEME_SETTINGS = {
  DRAWER_WITDH: 280,
}

const QUERY_NAMES = {
  ARTICLE: 'article',
  PAGE: 'page',
  SETTINGS: 'settings',
  ADMIN_DASHBOARD_REPORT: 'admin_dashboard_report',
}

const LS_DARK_MODE: ILocalStorage = {
  key: 'dark-mode',
}

const LOCAL_STORAGES = {
  LS_DARK_MODE,
}

export { THEME_SETTINGS, QUERY_NAMES, LOCAL_STORAGES }
