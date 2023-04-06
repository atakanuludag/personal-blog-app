// ** react
import { KeyboardEvent, MouseEvent } from 'react'

// ** next
import { default as NextLink } from 'next/link'

// ** mui
import { styled } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Link from '@mui/material/Link'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'

// ** icons
import MenuIcon from '@mui/icons-material/Menu'

// ** components
import ThemeModeSwitch from '@/components/ThemeModeSwitch'

const StyledTitle = styled('h1')(({ theme }) => ({
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

const StyledMenuButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(2),
}))

type ApplicationBarProps = {
  open: boolean
  toggleDrawer: (e: KeyboardEvent | MouseEvent) => void
  personDisplayName: string
}

export default function ApplicationBar({
  toggleDrawer,
  personDisplayName,
}: ApplicationBarProps) {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <StyledMenuButton color="inherit" edge="start" onClick={toggleDrawer}>
          <MenuIcon />
        </StyledMenuButton>
        <Box
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <StyledTitle>
            <Link component={NextLink} href="/">
              {personDisplayName}
            </Link>
          </StyledTitle>
          <ThemeModeSwitch isMobile />
        </Box>
      </Toolbar>
    </AppBar>
  )
}
