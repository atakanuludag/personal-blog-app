import React, { useState } from 'react'
import { default as NextLink } from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useSnackbar } from 'notistack'
import { Theme, useMediaQuery } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { styled, useTheme } from '@mui/material/styles'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ArticleIcon from '@mui/icons-material/Article'
import SettingsIcon from '@mui/icons-material/Settings'
import CategoryIcon from '@mui/icons-material/Category'
import TagIcon from '@mui/icons-material/Tag'
import PermMediaIcon from '@mui/icons-material/PermMedia'
import DarkModeSwitch from '@/components/DarkModeSwitch'
import LogoutIcon from '@mui/icons-material/Logout'
import AppBar from '@/layouts/AppBar'
import useStoreSettings from '@/hooks/useStoreSettings'
import { THEME_SETTINGS } from '@/core/Constants'
import useRouterActive from '@/hooks/useRouterActive'
import IListItemMenu from '@/models/IListItemMenu'

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

export default function NavigationAdmin() {
  const { settingsStore } = useStoreSettings()
  const classes = useStyles()
  const theme = useTheme()
  const routerActive = useRouterActive()
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()

  const isMdUp = useMediaQuery(theme.breakpoints.up('md'))
  const [navOpen, setNavOpen] = useState(false)
  const [logoutLoading, setLogoutLoading] = useState(false)

  const adminMenu: IListItemMenu[] = [
    {
      title: 'Dashboard',
      path: '/admin',
      icon: <DashboardIcon />,
    },
    {
      title: 'Makaleler',
      path: '/admin/articles',
      icon: <ArticleIcon />,
    },
    {
      title: 'Kategoriler',
      path: '/admin/categories',
      icon: <CategoryIcon />,
    },
    {
      title: 'Etiketler',
      path: '/admin/tags',
      icon: <TagIcon />,
    },
    {
      title: 'Ortam',
      path: '/admin/files',
      icon: <PermMediaIcon />,
    },
    {
      title: 'Ayarlar',
      path: '/admin/settings',
      icon: <SettingsIcon />,
    },
    // {
    //   title: 'Çıkış',
    //   path: '',
    //   icon: <LogoutIcon />,
    //   onClick: handleLogout,
    // },
  ]

  const handleLogout = async () => {
    setLogoutLoading(true)
    await axios.post(`/api/logout`)
    router.push('/')
    enqueueSnackbar('Başarıyla çıkış yapıldı.', {
      variant: 'success',
    })
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
          </div>

          <Divider />

          <List className={classes.menu}>
            {adminMenu.map((m, i) =>
              !m.onClick ? (
                <NextLink key={i} href={m.path} passHref>
                  <ListItemButton component="a" selected={routerActive(m.path)}>
                    <ListItemIcon>{m.icon}</ListItemIcon>
                    <ListItemText primary={m.title} />
                  </ListItemButton>
                </NextLink>
              ) : (
                <ListItemButton key={i} onClick={m.onClick}>
                  <ListItemIcon>{m.icon}</ListItemIcon>
                  <ListItemText primary={m.title} />
                </ListItemButton>
              ),
            )}
            <ListItemButton onClick={handleLogout} disabled={logoutLoading}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText
                primary={logoutLoading ? 'Yükleniyor...' : 'Çıkış Yap'}
              />
            </ListItemButton>
          </List>

          <Divider />

          <DarkModeSwitch />
        </nav>
      </Drawer>
    </div>
  )
}
