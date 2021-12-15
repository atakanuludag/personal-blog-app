import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { makeStyles } from '@mui/styles'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Theme } from '@mui/material'
import { trTR } from '@mui/material/locale'
import Navigation from '@/layouts/Navigation'
import Content from '@/layouts/Content'
import useMediaQuery from '@mui/material/useMediaQuery'

interface ITheme {
  children: React.ReactNode
}

const useStyles = makeStyles({
  '@global': {
    '*::-webkit-scrollbar': {
      width: '6px',
      backgroundColor: '#2a2a2a',
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgb(100 100 100)',
      borderRadius: '.5rem',
    },
  },
  root: {
    display: 'flex',
  },
})

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
      },
    },
    trTR,
  )

  const classes = useStyles()
  //const isMdUp = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navigation />
        <Content children={children} />
      </ThemeProvider>
    </div>
  )
}

export default AppTheme
