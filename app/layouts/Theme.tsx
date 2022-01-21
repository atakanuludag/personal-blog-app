import React, { ReactNode, useEffect } from 'react'
import { Theme } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { common, grey } from '@mui/material/colors'
import { trTR } from '@mui/material/locale'
//import Main from '@/layouts'
import useStoreSettings from '@/hooks/useStoreSettings'
import useInitialDarkMode from '@/hooks/useInitialDarkMode'
import ISettings from '@/models/ISettings'

interface ITheme {
  children: ReactNode
  settings: ISettings
}

const AppTheme = ({ children, settings }: ITheme) => {
  const { settingsStore, setSettingsStore } = useStoreSettings()
  const darkColor = '#202020'
  const darkMode = settingsStore.darkMode

  useEffect(() => {
    let data = {
      ...settingsStore,
      ...settings,
    }

    if (settingsStore.darkMode === null) {
      const initialDarkMode = useInitialDarkMode()
      data.darkMode = initialDarkMode()
    }

    setSettingsStore({
      ...data,
    })
  }, [])

  const defaultThemeSettings: any = {
    typography: {
      fontFamily: ['system-ui', '-apple-system', 'Roboto', 'sans-serif'].join(
        ',',
      ),
      button: {
        textTransform: 'none',
      },
    },
  }

  const darkTheme = createTheme({
    ...defaultThemeSettings,
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkColor,
        contrastText: common.white,
      },
      secondary: {
        main: common.white,
        contrastText: grey[600],
      },
      text: {
        primary: common.white,
        secondary: common.white,
      },
    },
    trTR,
  })

  const lightTheme = createTheme({
    ...defaultThemeSettings,
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: grey[50],
        contrastText: grey[900],
      },
      secondary: {
        main: grey[900],
        contrastText: grey[600],
      },
      text: {
        primary: grey[900],
        secondary: grey[900],
      },
    },
    trTR,
  })

  const theme: Theme = darkMode ? darkTheme : lightTheme

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

export default AppTheme