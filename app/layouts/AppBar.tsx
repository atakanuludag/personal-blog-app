import React from 'react'
import { default as NextLink } from 'next/link'
import { Theme } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import { styled } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Link from '@mui/material/Link'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'

const useStyles = makeStyles((theme: Theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
}))

const Title = styled('h1')(({ theme }) => ({
  fontSize: '1.2rem',
  fontWeight: 'bold',
  justifyContent: 'center',
  margin: 0,
  padding: 0,
  '& a': {
    color: theme.palette.primary.contrastText,
    textDecoration: 'none',
  },
}))

interface IApplicationBar {
  open: boolean
  toggleDrawer: (e: React.KeyboardEvent | React.MouseEvent) => void
  personDisplayName: string
}

export default function ApplicationBar({
  toggleDrawer,
  personDisplayName,
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
        <Title>
          <Link component={NextLink} href="/">
            {personDisplayName}
          </Link>
        </Title>
      </Toolbar>
    </AppBar>
  )
}
