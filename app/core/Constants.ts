import LocalStorageModel from '@/models/LocalStorageModel'

const THEME_SETTINGS = {
  DRAWER_WITDH: 280,
}

const QUERY_NAMES = {
  ARTICLE: 'article',
  TAG: 'tag',
  CATEGORY: 'category',
  PAGE: 'page',
  SETTINGS: 'settings',
  ADMIN_DASHBOARD_REPORT: 'admin_dashboard_report',
}

const LS_DARK_MODE: LocalStorageModel = {
  key: 'dark-mode',
}

const LOCAL_STORAGES = {
  LS_DARK_MODE,
}

export { THEME_SETTINGS, QUERY_NAMES, LOCAL_STORAGES }
