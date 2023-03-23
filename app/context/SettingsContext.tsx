// ** react
import { createContext, ReactNode, useEffect, useState } from 'react'

// ** core
import { LOCAL_STORAGES } from '@/core/Constants'

// ** utils
import { setLocalStorage, getLocalStorage } from '@/utils/LocalStorage'

// ** hooks
import useInitialBrowserMode from '@/hooks/useInitialBrowserMode'

export enum PaletteMode {
  DARK = 'dark',
  LIGHT = 'light',
}

export type SettingsModelContextProps = {
  themeMode: PaletteMode
  handleChangeThemeMode: (mode: PaletteMode) => void
}

export const SettingsContext = createContext<SettingsModelContextProps>({
  themeMode: PaletteMode.DARK,
  handleChangeThemeMode: () => {},
})

const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const initialDarkMode = useInitialBrowserMode()
  const [themeMode, setThemeMode] = useState<PaletteMode>(initialDarkMode())

  const lsDarkMode = getLocalStorage(LOCAL_STORAGES.LS_DARK_MODE)
  //todo: dark mode belki cookiye alırım. çünkü ilkte site beyaz gelip sonra siyah oluyor.
  useEffect(() => {
    if (lsDarkMode) setThemeMode(lsDarkMode)
  }, [lsDarkMode])

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
