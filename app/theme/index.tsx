import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Theme } from '@mui/material'
import { trTR } from '@mui/material/locale'
import Main from '@/layouts'
import useMediaQuery from '@mui/material/useMediaQuery'

interface ITheme {
  children: React.ReactNode
}

const AppTheme = ({ children }: ITheme): React.ReactElement => {
  const theme = createTheme(
    {
      palette: {
        mode: 'dark',
        //mode: darkMode ? 'dark' : 'light',
        primary: {
          light: '#ffcd38',
          main: '#ffc107',
          dark: '#b28704',
          contrastText: '#000',
        },
        secondary: {
          light: '#ffa733',
          main: '#ff9100',
          dark: '#b26500',
          contrastText: '#000',
        },
      },
      typography: {
        fontFamily: ['system-ui', '-apple-system', 'Roboto', 'sans-serif'].join(
          ',',
        ),
        button: {
          textTransform: 'none',
        },
      },
    },
    trTR,
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Main children={children} />
    </ThemeProvider>
  )
}

export default AppTheme
