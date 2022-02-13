import { useRouter } from 'next/router'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'

interface IBreadcrumbProps {}

function Breadcrumb({ ...props }: IBreadcrumbProps) {
  const router = useRouter()
  const { pathname } = router

  if (pathname === '/' || pathname.indexOf('admin') > 0) return null
  return (
    <Box
      display="flex"
      justifyContent="flex-start"
      sx={{ paddingBottom: (theme) => theme.spacing(2) }}
      {...props}
    >
      <Breadcrumbs
        aria-label="breadcrumb"
        separator="›"
        sx={{ color: (theme) => theme.palette.grey[800] }}
      >
        <Link underline="hover" color="inherit" href="/">
          MUI
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/getting-started/installation/"
        >
          Core
        </Link>
        <Typography>Breadcrumbs</Typography>
      </Breadcrumbs>
    </Box>
  )
}

export default Breadcrumb
