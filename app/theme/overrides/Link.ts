import { Theme } from '@mui/material'

export default function Link(theme: Theme) {
  //const isDark = theme.palette.mode === 'dark'
  return {
    MuiLink: {
      styleOverrides: {
        root: {
          color: theme.palette.secondary.main,
        },
      },
    },
  }
}
