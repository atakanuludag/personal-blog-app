import React from 'react'
import { Theme } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { common, grey } from '@mui/material/colors'
import { trTR } from '@mui/material/locale'
import Main from '@/layouts'

interface ITheme {
  children: React.ReactNode
}

const AppTheme = ({ children }: ITheme): React.ReactElement => {
  const darkColor = '#202020'
  const darkMode = false

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
      <Main children={children} />
    </ThemeProvider>
  )
}

export default AppTheme
