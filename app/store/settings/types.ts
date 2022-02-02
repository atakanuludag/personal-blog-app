import { Action } from 'redux'
import ISettings from '@/models/ISettings'

export interface SettingsState extends ISettings {
  darkMode: boolean | null
  // isLogin: boolean
  // accessToken: string | null
  // userId: string | null
}

export enum SettingsActionType {
  SET_SETTINGS = 'SET_SETTINGS',
  //SET_AUTH = 'SET_AUTH',
}

export interface SetSettingsAction extends Action {
  type: SettingsActionType.SET_SETTINGS
  data: SettingsState
}

// export interface SetAuthAction extends Action {
//   type: SettingsActionType.SET_AUTH
//   data: SettingsState
// }

export type SettingsActions = SetSettingsAction
