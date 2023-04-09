// ** react
import { Fragment, useState, KeyboardEvent, MouseEvent } from 'react'

// ** next
import { default as NextLink } from 'next/link'

// ** third party
import { css } from '@emotion/css'

// ** mui
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'

// ** icons
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import GitHubIcon from '@mui/icons-material/GitHub'
import SearchIcon from '@mui/icons-material/Search'

// ** layouts
import AppBar from '@/layouts/AppBar'

// ** core
import { THEME_SETTINGS } from '@/core/Constants'

// ** models
import AppPropsModel from '@/models/AppPropsModel'

// ** config
import {
  SITE_TITLE,
  PERSONAL_DESCRIPTION,
  TWITTER_URL,
  INSTAGRAM_URL,
  GITHUB_URL,
  LINKEDIN_URL,
  PERSONAL_EMAIL,
} from '@/config'

const Title = styled('h1')(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  textAlign: 'center',
  padding: 0,
  '& a': {
    display: 'block',
    width: '100%',
    color: theme.palette.primary.contrastText,
    textDecoration: 'none',
  },
}))

const DrawerWrapper = styled(Box)(() => ({
  '&>*': {
    padding: '5px 0px',
  },
}))

const Padding = styled('div')(({ theme }) => ({
  paddingLeft: theme.spacing(1.5),
  paddingRight: theme.spacing(1.5),
}))

const StyledNav = styled('nav')(() => ({
  '& p': {
    textAlign: 'center',
  },
  '&>*': {
    padding: '5px 0px',
  },
}))

const StyledDrawer = styled(Drawer)(() => ({
  flexShrink: 0,
  width: THEME_SETTINGS.DRAWER_WITDH,
}))

const ProfileSection = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingLeft: 5,
  paddingRight: 5,
  '&>*': {
    paddingBottom: '20px',
  },
}))

const Avatar = styled('img')(() => ({
  width: '70%',
  borderRadius: '100%',
}))

const SocialMedia = styled('ul')(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  margin: 0,
  padding: 0,
  '& li': {
    listStyle: 'none',
  },
}))

const CategoriesWrapper = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1.5),
}))

export default function Navigation({ categories, navbarPages }: AppPropsModel) {
  const theme = useTheme()
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'))
  const [navOpen, setNavOpen] = useState(false)

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
          personDisplayName={SITE_TITLE || ''}
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
        <StyledNav>
          <ProfileSection>
            <Title>
              <Link component={NextLink} href="/">
                {SITE_TITLE}
              </Link>
            </Title>

            <Avatar
              src="https://www.atakanuludag.com/wp-content/uploads/2019/09/avatar.jpg"
              alt={SITE_TITLE}
            />
            <Typography variant="caption" component="p">
              {PERSONAL_DESCRIPTION}
            </Typography>

            <SocialMedia>
              <li>
                <Link href={TWITTER_URL}>
                  <Tooltip title="Twitter">
                    <TwitterIcon color="action" />
                  </Tooltip>
                </Link>
              </li>
              <li>
                <Link href={INSTAGRAM_URL}>
                  <Tooltip title="Instagram">
                    <InstagramIcon color="action" />
                  </Tooltip>
                </Link>
              </li>
              <li>
                <Link href={GITHUB_URL}>
                  <Tooltip title="Github">
                    <GitHubIcon color="action" />
                  </Tooltip>
                </Link>
              </li>
              <li>
                <Link href={LINKEDIN_URL}>
                  <Tooltip title="Linkedin">
                    <LinkedInIcon color="action" />
                  </Tooltip>
                </Link>
              </li>
            </SocialMedia>
          </ProfileSection>

          <Box padding={1}>
            <FormControl variant="outlined" size="small" fullWidth>
              <InputLabel htmlFor="search-input">Ara...</InputLabel>
              <OutlinedInput
                id="search-input"
                size="small"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      // onClick={handleClickShowPassword}
                      // onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      <SearchIcon sx={{ fontSize: '20px' }} />
                    </IconButton>
                  </InputAdornment>
                }
                label="Ara..."
              />
            </FormControl>
          </Box>

          <Divider />

          {navbarPages && (
            <Fragment>
              <List>
                {navbarPages.map((page) => (
                  <ListItemButton
                    key={page._id}
                    LinkComponent={NextLink}
                    href={`/page/${page.guid}`}
                  >
                    <ListItemText primary={page.title} />
                  </ListItemButton>
                ))}
              </List>

              <Divider />
            </Fragment>
          )}
          {categories.length > 0 && (
            <CategoriesWrapper>
              <Padding>
                <Typography
                  component="span"
                  fontSize="16px"
                  textTransform="uppercase"
                  fontWeight="bold"
                >
                  Kategoriler
                </Typography>
              </Padding>

              <List>
                {categories.map((category) => (
                  <ListItemButton
                    key={category._id}
                    LinkComponent={NextLink}
                    href={`/category/${category.guid}`}
                  >
                    <ListItemText primary={category.title} />
                  </ListItemButton>
                ))}
              </List>
            </CategoriesWrapper>
          )}
        </StyledNav>
      </StyledDrawer>
    </DrawerWrapper>
  )
}
