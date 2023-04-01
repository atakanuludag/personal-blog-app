// ** react
import { useState, KeyboardEvent, MouseEvent, useEffect } from 'react'

// ** next
import { default as NextLink } from 'next/link'

// ** third party
import { css } from '@emotion/css'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useSnackbar } from 'notistack'

// ** mui
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

// ** icons
import DashboardIcon from '@mui/icons-material/Dashboard'
import ArticleIcon from '@mui/icons-material/Article'
import CategoryIcon from '@mui/icons-material/Category'
import TagIcon from '@mui/icons-material/Tag'
import PermMediaIcon from '@mui/icons-material/PermMedia'
import LogoutIcon from '@mui/icons-material/Logout'

// ** layouts
import AppBar from '@/layouts/AppBar'

// ** components
import DarkModeSwitch from '@/components/DarkModeSwitch'

// ** core
import { THEME_SETTINGS } from '@/core/Constants'
import { axiosRemoveTokenInterceptor } from '@/core/Axios'

// ** hooks
import useRouterActive from '@/hooks/useRouterActive'

// ** models
import ListItemMenuProps from '@/models/ListItemMenuProps'

const DrawerWrapper = styled(Box)(() => ({
  '&>*': {
    padding: '5px 0px',
  },
}))

const Padding = styled('div')(({ theme }) => ({
  paddingLeft: theme.spacing(1.5),
  paddingRight: theme.spacing(1.5),
}))

const StyledDrawer = styled(Drawer)(() => ({
  flexShrink: 0,
  width: THEME_SETTINGS.DRAWER_WITDH,
}))

export default function NavigationAdmin() {
  const theme = useTheme()
  const routerActive = useRouterActive()
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()

  const isMdUp = useMediaQuery(theme.breakpoints.up('md'))
  const [navOpen, setNavOpen] = useState(false)
  const [logoutLoading, setLogoutLoading] = useState(false)

  const drawerPaperCSS = css`
    box-shadow: ${theme.palette.mode === 'dark'
      ? '3px 1px 6px 0px rgba(0,0,0,0.75)'
      : '3px 1px 6px 0px rgb(203 203 203 / 75%)'};
    background-color: ${theme.palette.primary.main};
    background-image: none;
    white-space: break-spaces;
    width: ${THEME_SETTINGS.DRAWER_WITDH}px;
    overflow-x: hidden;
    '&>*': {
      padding: 5px;
    }
  `

  useEffect(() => {
    if (router?.asPath) setNavOpen(false)
  }, [router.asPath])

  const adminMenu: ListItemMenuProps[] = [
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
    axiosRemoveTokenInterceptor()
    router.push('/')
    enqueueSnackbar('Başarıyla çıkış yapıldı.', {
      variant: 'success',
    })
  }

  const toggleDrawer = (e: KeyboardEvent | MouseEvent) => {
    const key = (e as KeyboardEvent).key
    if (e.type === 'keydown' && (key === 'Tab' || key === 'Shift')) {
      return
    }
    setNavOpen(!navOpen)
  }

  return (
    <DrawerWrapper>
      {!isMdUp && (
        <AppBar
          open={navOpen}
          toggleDrawer={toggleDrawer}
          personDisplayName={'Admin Panel'}
        />
      )}
      <StyledDrawer
        variant={isMdUp ? 'permanent' : 'temporary'}
        classes={{
          paper: drawerPaperCSS,
          docked: drawerPaperCSS,
        }}
        anchor="left"
        open={isMdUp ? true : navOpen}
        hideBackdrop={isMdUp}
        onClose={toggleDrawer}
      >
        <Box>
          <List sx={{ padding: 0 }}>
            {adminMenu.map((m, i) =>
              !m.onClick ? (
                <ListItemButton
                  key={i}
                  component={NextLink}
                  href={m.path}
                  selected={routerActive(m.path)}
                >
                  <ListItemIcon>{m.icon}</ListItemIcon>
                  <ListItemText primary={m.title} />
                </ListItemButton>
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
        </Box>
      </StyledDrawer>
    </DrawerWrapper>
  )
}
