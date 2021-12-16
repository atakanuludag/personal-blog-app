import React from 'react'

import { Theme } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Constants from '@/core/Constants'

const useStyles = makeStyles((theme: Theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
}))

interface IApplicationBar {
  open: boolean
  toggleDrawer: (e: React.KeyboardEvent | React.MouseEvent) => void
}

export default function ApplicationBar({
  open,
  toggleDrawer,
}: IApplicationBar) {
  const classes = useStyles()

  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={toggleDrawer}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          Responsive Drawer Example
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
