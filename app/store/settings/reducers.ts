import { SettingsActionType, SettingsState, SettingsActions } from './types'

const initialState: SettingsState = {
  darkMode: false,
}

const settings = (
  state: SettingsState = initialState,
  action: SettingsActions,
): SettingsState => {
  switch (action.type) {
    case SettingsActionType.SET_SETTINGS:
      return { ...state, ...action.data }
    default:
      return state
  }
}

export default settings
