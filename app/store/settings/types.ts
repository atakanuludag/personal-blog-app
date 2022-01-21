import { Action } from 'redux'
import ISettings from '@/models/ISettings'

export interface SettingsState extends ISettings {
  darkMode: boolean | null
}

export enum SettingsActionType {
  SET_SETTINGS = 'SET_SETTINGS',
}

export interface SetSettingsAction extends Action {
  type: SettingsActionType.SET_SETTINGS
  data: SettingsState
}

export type SettingsActions = SetSettingsAction
