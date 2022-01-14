import { ArticleState } from './article/types'
import { SettingsState } from './settings/types'

export default interface State {
  articleReducers: ArticleState
  settingsReducers: SettingsState
}
