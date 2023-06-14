import { Components, Theme } from '@mui/material'

export default function ButtonBase(
  theme: Theme,
): Components<Omit<Theme, 'components'>> {
  return {
    MuiButtonBase: {
      styleOverrides: {
        root: {},
      },
    },
  }
}
