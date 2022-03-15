import { SettingsActionType, SettingsState, SettingsActions } from './types'

const initialState: SettingsState = {
  userIpAddress: '127.0.0.1',
  darkMode: null,
  siteUrl: '',
  siteTitle: '',
  siteDescription: '',
  personDisplayName: '',
  personDescription: '',
  personTwitterUrl: '',
  personInstagramUrl: '',
  personGithubUrl: '',
  personLinkedinUrl: '',
  adminMail: '',
  pageSize: 10,
  navbarPages: [],
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
