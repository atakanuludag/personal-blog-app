// ** react
import { ReactNode, useMemo } from 'react'

// ** third party
import mediaQuery from 'css-mediaquery'

// ** mui
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { common, grey } from '@mui/material/colors'
import { trTR } from '@mui/material/locale'

// ** theme
import componentsOverride from '@/theme/overrides'

// ** hooks
import useSettingsContext from '@/hooks/useSettingsContext'

// ** models
import { PaletteMode } from '@/models/enums'

type ThemeProps = {
  children: ReactNode
  deviceType: string
}

const AppTheme = ({ children, deviceType }: ThemeProps) => {
  const { themeMode } = useSettingsContext()
  const darkColor = '#202020'

  const ssrMatchMedia = (query: string) => ({
    matches: mediaQuery.match(query, {
      // The estimated CSS width of the browser.
      width: deviceType === 'mobile' ? '0px' : '1024px',
    }),
  })

  const darkTheme = useMemo(
    () =>
      createTheme(
        {
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
          components: {
            MuiUseMediaQuery: {
              defaultProps: {
                ssrMatchMedia,
              },
            },
          },
        },
        trTR,
      ),
    [themeMode, deviceType],
  )

  const lightTheme = useMemo(
    () =>
      createTheme(
        {
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
          components: {
            MuiUseMediaQuery: {
              defaultProps: {
                ssrMatchMedia,
              },
            },
          },
        },
        trTR,
      ),
    [themeMode, deviceType],
  )

  const theme = themeMode === PaletteMode.DARK ? darkTheme : lightTheme

  theme.components = {
    ...theme.components,
    ...componentsOverride(theme),
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

export default AppTheme
