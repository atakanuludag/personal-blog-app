import {
  SettingsActionType,
  SetSettingsAction,
  SetAuthAction,
  SettingsState,
} from './types'

export const setSettings = (data: SettingsState): SetSettingsAction => ({
  type: SettingsActionType.SET_SETTINGS,
  data,
})

export const setAuth = (data: SettingsState): SetAuthAction => ({
  type: SettingsActionType.SET_AUTH,
  data,
})
