import { Action } from 'redux'

export interface SettingsState {
  darkMode: boolean
}

export enum SettingsActionType {
  SET_SETTINGS = 'SET_SETTINGS',
}

export interface SetSettingsAction extends Action {
  type: SettingsActionType.SET_SETTINGS
  data: SettingsState
}

export type SettingsActions = SetSettingsAction
