import React, { createContext, useState } from 'react'
import { LOCAL_STORAGES } from '@/core/Constants'
import { setLocalStorage } from '@/utils/LocalStorage'
import useInitialBrowserMode from '@/hooks/useInitialBrowserMode'

export enum PaletteMode {
  DARK = 'dark',
  LIGHT = 'light',
}

export interface ISettingsContextProps {
  themeMode: PaletteMode
  handleChangeThemeMode: (mode: PaletteMode) => void
}

export const SettingsContext = createContext<ISettingsContextProps>({
  themeMode: PaletteMode.DARK,
  handleChangeThemeMode: () => {},
})

const SettingsProvider = ({ children }: any) => {
  const initialDarkMode = useInitialBrowserMode()
  const [themeMode, setThemeMode] = useState<PaletteMode>(initialDarkMode())

  const handleChangeThemeMode = (mode: PaletteMode) => {
    setLocalStorage(LOCAL_STORAGES.LS_DARK_MODE, mode)
    setThemeMode(mode)
  }

  return (
    <SettingsContext.Provider value={{ themeMode, handleChangeThemeMode }}>
      {children}
    </SettingsContext.Provider>
  )
}

export default SettingsProvider
