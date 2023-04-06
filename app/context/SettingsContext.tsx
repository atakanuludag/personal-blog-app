// ** react
import { createContext, ReactNode, useState } from 'react'

// ** services
import NextService from '@/services/NextService'

// ** models
import { PaletteMode } from '@/models/enums'

export type SettingsModelContextProps = {
  themeMode: PaletteMode
  handleChangeThemeMode: (mode: PaletteMode) => void
}

export const SettingsContext = createContext<SettingsModelContextProps>({
  themeMode: PaletteMode.DARK,
  handleChangeThemeMode: () => {},
})

type SettingsProviderProps = {
  children: ReactNode
  initialThemeMode: PaletteMode
}

const SettingsProvider = ({
  children,
  initialThemeMode,
}: SettingsProviderProps) => {
  const [themeMode, setThemeMode] = useState<PaletteMode>(initialThemeMode)

  const handleChangeThemeMode = async (mode: PaletteMode) => {
    setThemeMode(mode)
    await NextService.changeThemeMode(mode)
  }

  return (
    <SettingsContext.Provider value={{ themeMode, handleChangeThemeMode }}>
      {children}
    </SettingsContext.Provider>
  )
}

export default SettingsProvider
