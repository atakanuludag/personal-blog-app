import { SettingsActionType, SetSettingsAction, SettingsState } from './types'

export const setSettings = (data: SettingsState): SetSettingsAction => ({
  type: SettingsActionType.SET_SETTINGS,
  data,
})
