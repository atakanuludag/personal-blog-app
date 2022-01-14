import { SettingsActionType, SettingsState, SettingsActions } from './types'
import BrowserDarkMode from '@/utils/BrowserDarkMode'

const initialState: SettingsState = {
  //darkMode: BrowserDarkMode(),
  darkMode: true,
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
