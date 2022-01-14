import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AppState from '@/store/appState'
import { setSettings } from '@/store/settings/actions'
import { SettingsState } from '@/store/settings/types'

export default function useStoreSettings() {
  const dispatch = useDispatch()

  const settingsStore = useSelector((state: AppState) => state.settingsReducers)

  const setSettingsStore = useCallback(
    (data: SettingsState) => dispatch(setSettings(data)),
    [dispatch],
  )

  return { settingsStore, setSettingsStore }
}
