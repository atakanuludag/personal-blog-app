import React, { useState } from 'react'
import { default as NextLink } from 'next/link'
import { Theme, useMediaQuery } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { styled, useTheme } from '@mui/material/styles'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Box from '@mui/material/Box'
import EmailIcon from '@mui/icons-material/Email'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import GitHubIcon from '@mui/icons-material/GitHub'
import PersonIcon from '@mui/icons-material/Person'
import DarkModeSwitch from '@/components/DarkModeSwitch'
import AppBar from '@/layouts/AppBar'
import useStoreSettings from '@/hooks/useStoreSettings'
import { THEME_SETTINGS } from '@/core/Constants'
import Icon from '@mui/material/Icon'

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  nav: {
    '& p': {
      textAlign: 'center',
    },
    '&>*': {
      padding: '5px 0px',
    },
  },
  drawer: {
    flexShrink: 0,
    width: THEME_SETTINGS.DRAWER_WITDH,
  },
  drawerPaper: {
    backgroundColor: theme.palette.primary.main,
    backgroundImage: 'none',
    whiteSpace: 'break-spaces',
    width: THEME_SETTINGS.DRAWER_WITDH,
    overflowX: 'hidden',
    padding: '10px 15px',
    '&>*': {
      paddingTop: '10px',
      paddingBottom: '10px',
    },
  },
  profileSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '&>*': {
      paddingBottom: '20px',
    },
  },
  avatar: {
    width: '70%',
    borderRadius: '100%',
  },
  socialMedia: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 0,
    padding: 0,
    '& li': {
      listStyle: 'none',
    },
  },
  menu: {
    margin: 0,
  },
}))

const Title = styled('h1')(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  textAlign: 'center',
  margin: 0,
  padding: 0,
  '& a': {
    display: 'block',
    width: '100%',
    color: theme.palette.primary.contrastText,
    textDecoration: 'none',
  },
}))

export default function Navigation() {
  const { settingsStore } = useStoreSettings()
  const classes = useStyles()
  const theme = useTheme()
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'))
  const [navOpen, setNavOpen] = useState(false)

  const toggleDrawer = (e: React.KeyboardEvent | React.MouseEvent) => {
    const key = (e as React.KeyboardEvent).key
    if (e.type === 'keydown' && (key === 'Tab' || key === 'Shift')) {
      return
    }
    setNavOpen(!navOpen)
  }

  return (
    <div className={classes.root}>
      {!isMdUp && (
        <AppBar
          open={navOpen}
          toggleDrawer={toggleDrawer}
          personDisplayName={settingsStore.personDisplayName}
        />
      )}
      <Drawer
        className={classes.drawer}
        variant={isMdUp ? 'permanent' : 'temporary'}
        classes={{
          paper: classes.drawerPaper,
          docked: classes.drawerPaper,
        }}
        anchor="left"
        open={isMdUp ? true : navOpen}
        hideBackdrop={isMdUp}
        onClose={toggleDrawer}
      >
        <nav className={classes.nav}>
          <div className={classes.profileSection}>
            <Title>
              <NextLink href="/" passHref>
                <Link>{settingsStore.personDisplayName}</Link>
              </NextLink>
            </Title>

            <img
              className={classes.avatar}
              src="https://www.atakanuludag.com/wp-content/uploads/2019/09/avatar.jpg"
              alt={settingsStore.personDisplayName}
            />
            <Typography variant="caption" component="p">
              {settingsStore.personDescription}
            </Typography>

            <Box component="ul" className={classes.socialMedia}>
              <li>
                <Link href={settingsStore.personTwitterUrl}>
                  <Tooltip title="Twitter">
                    <TwitterIcon color="action" />
                  </Tooltip>
                </Link>
              </li>
              <li>
                <Link href={settingsStore.personInstagramUrl}>
                  <Tooltip title="Instagram">
                    <InstagramIcon color="action" />
                  </Tooltip>
                </Link>
              </li>
              <li>
                <Link href={settingsStore.personGithubUrl}>
                  <Tooltip title="Github">
                    <GitHubIcon color="action" />
                  </Tooltip>
                </Link>
              </li>
              <li>
                <Link href={settingsStore.personLinkedinUrl}>
                  <Tooltip title="Linkedin">
                    <LinkedInIcon color="action" />
                  </Tooltip>
                </Link>
              </li>
            </Box>
          </div>

          <Divider />

          <List className={classes.menu}>
            {settingsStore.navbarPages.map((p, i) => (
              <NextLink key={i} href={`/page/${p.guid}`} passHref>
                <ListItemButton component="a">
                  {/* <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon> */}
                  <ListItemText primary={p.title} />
                </ListItemButton>
              </NextLink>
            ))}
          </List>

          <Divider />

          <DarkModeSwitch />
        </nav>
      </Drawer>
    </div>
  )
}
