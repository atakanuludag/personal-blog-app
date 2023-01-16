import { Theme } from '@mui/material'

export default function Button(theme: Theme) {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          color: theme.palette.secondary.main,
        },
      },
    },
  }
}
