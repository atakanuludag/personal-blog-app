import { Theme } from '@mui/material'
import darkScrollbar from '@mui/material/darkScrollbar'

export default function CssBaseline(theme: Theme) {
  return {
    MuiCssBaseline: {
      styleOverrides: {
        body: theme.palette.mode === 'dark' ? darkScrollbar() : null,
      },
    },
  }
}
