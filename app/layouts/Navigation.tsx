import React, { MouseEventHandler, useState } from 'react'
import clsx from 'clsx'
import { ThemeProvider, makeStyles } from '@mui/styles'
import FormControlLabel from '@mui/material/FormControlLabel'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Drawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import Box from '@mui/material/Box'
import EmailIcon from '@mui/icons-material/Email'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import GitHubIcon from '@mui/icons-material/GitHub'
import Brightness6Icon from '@mui/icons-material/Brightness6'

import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PersonIcon from '@mui/icons-material/Person'
import HotDealIcon from '@mui/icons-material/Whatshot'
import CategoryIcon from '@mui/icons-material/Category'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import NightsStayIcon from '@mui/icons-material/NightsStay'
import { Theme, useMediaQuery } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'

import DarkModeSwitch from '@/components/DarkModeSwitch'
import AppBar from '@/layouts/AppBar'

import Constants from '@/core/Constants'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    float: 'left',
    '& p': {
      textAlign: 'center',
    },
  },
  drawer: {
    flexShrink: 0,
    width: Constants.DRAWER_WITDH,
  },
  drawerPaper: {
    //backgroundColor: '#202020',
    backgroundColor: theme.palette.primary.main,
    backgroundImage: 'none',
    whiteSpace: 'break-spaces',
    width: Constants.DRAWER_WITDH,
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

export default function Navigation() {
  const classes = useStyles()
  const theme = useTheme()
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'))
  const [navOpen, setNavOpen] = useState(false)
  const handleNavigationButton = (link: string) => {
    //console.log("link", link);
    //history.push(`/${link}`);
  }

  const toggleDrawer = (e: React.KeyboardEvent | React.MouseEvent) => {
    const key = (e as React.KeyboardEvent).key
    if (e.type === 'keydown' && (key === 'Tab' || key === 'Shift')) {
      return
    }
    setNavOpen(!navOpen)
  }

  return (
    <div className={classes.root}>
      {!isMdUp && <AppBar open={navOpen} toggleDrawer={toggleDrawer} />}
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
        <Typography variant="h5" component="h1">
          Atakan Yasin Uludağ
        </Typography>
        <nav>
          <div className={classes.profileSection}>
            <img
              className={classes.avatar}
              src="https://www.atakanuludag.com/wp-content/uploads/2019/09/avatar.jpg"
              alt="Atakan Yasin Uludağ"
            />
            <Typography variant="caption" component="p">
              İstanbul’da doğdum ve senelerdir İstanbul’da yaşıyorum. Aslen
              Erzincanlıyım. Zaman zaman başka şehirlere ve ülkelere turistik
              gezilerim oldu ancak döndüm dolaştım yine aynı yere geldim. Yeni
              yerler görmeyi ve farklı ülkelere gitmeyi çok seviyorum.
            </Typography>

            <Box component="ul" className={classes.socialMedia}>
              <li>
                <Link href="#">
                  <Tooltip title="Twitter">
                    <TwitterIcon color="action" />
                  </Tooltip>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <Tooltip title="Instagram">
                    <InstagramIcon color="action" />
                  </Tooltip>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <Tooltip title="Twitter">
                    <GitHubIcon color="action" />
                  </Tooltip>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <Tooltip title="Linkedin">
                    <LinkedInIcon color="action" />
                  </Tooltip>
                </Link>
              </li>
            </Box>
          </div>

          <Divider />

          <List className={classes.menu}>
            <ListItem
              button
              onClick={() => handleNavigationButton('dashboard')}
            >
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Hakkımda" />
            </ListItem>

            <ListItem button onClick={() => handleNavigationButton('users')}>
              <ListItemIcon>
                <EmailIcon />
              </ListItemIcon>
              <ListItemText primary="İletişim" />
            </ListItem>
          </List>

          <Divider />

          <DarkModeSwitch />
        </nav>
      </Drawer>
    </div>
  )
}
