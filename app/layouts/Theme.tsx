import React, { ReactNode, useEffect } from 'react'
import { Theme } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { common, grey } from '@mui/material/colors'
import { trTR } from '@mui/material/locale'
import useStoreSettings from '@/hooks/useStoreSettings'
import useInitialDarkMode from '@/hooks/useInitialDarkMode'
import ISettings from '@/models/ISettings'

interface ITheme {
  children: ReactNode
  settings: ISettings
  userIpAdress: string;
}

const AppTheme = ({ children, settings, userIpAdress }: ITheme) => {

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

    data.userIpAddress = userIpAdress;
    
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
    components: {
      MuiListItemButton: {
        styleOverrides: {
          root: {
            "&.Mui-selected": {
              backgroundColor: grey[700],
              "&:hover": {
                backgroundColor: grey[600],
              }
            },
            
          }
        },
      },
    },
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
    components: {
      MuiListItemButton: {
        styleOverrides: {
          root: {
            "&.Mui-selected": {
              backgroundColor: grey[300],
              "&:hover": {
                backgroundColor: grey[200],
              }
            }
          }
        },
      },
    },
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
