import { ReactNode, useMemo, useState, useEffect } from 'react'
import { Theme } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { common, grey } from '@mui/material/colors'
import { trTR } from '@mui/material/locale'
import useSettingsContext, { PaletteMode } from '@/hooks/useSettingsContext'
import componentsOverride from '@/theme/overrides'

interface ITheme {
  children: ReactNode
}

const AppTheme = ({ children }: ITheme) => {
  const { themeMode } = useSettingsContext()
  const darkColor = '#202020'

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

  const darkTheme = useMemo(
    () =>
      createTheme({
        ...defaultThemeSettings,
        palette: {
          mode: 'dark',
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
      }),
    [themeMode],
  )

  const lightTheme = useMemo(
    () =>
      createTheme({
        ...defaultThemeSettings,
        palette: {
          mode: 'light',
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
      }),
    [themeMode],
  )

  const [theme, setTheme] = useState<Theme>(darkTheme)

  useEffect(() => {
    console.log('themeMode', themeMode)
    setTheme(themeMode === PaletteMode.DARK ? darkTheme : lightTheme)
  }, [themeMode])

  // const theme: Theme = themeMode === PaletteMode.DARK ? darkTheme : lightTheme
  theme.components = componentsOverride(theme)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

export default AppTheme
