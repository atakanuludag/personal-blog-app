import { Theme } from '@mui/material'

export default function ListItemButton(theme: Theme) {
  return {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: theme.palette.grey[700],
            '&:hover': {
              backgroundColor: theme.palette.grey[600],
            },
          },
        },
      },
    },
  }
}
