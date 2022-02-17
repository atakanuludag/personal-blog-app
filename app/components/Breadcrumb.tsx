import { useRouter } from 'next/router'
import { default as NextLink } from 'next/link'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'

export interface IBreadCrumb {
  title: string
  link: string | null
}

interface IBreadcrumbProps {
  isShowHome?: boolean
  data: IBreadCrumb[]
}

function Breadcrumb({ data, isShowHome = true, ...props }: IBreadcrumbProps) {
  const router = useRouter()

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
        {isShowHome && (
          <NextLink href="/" passHref>
            <Link underline="hover" color="inherit">
              Ana Sayfa
            </Link>
          </NextLink>
        )}

        {/* <Link
          underline="hover"
          color="inherit"
          href="/getting-started/installation/"
        >
          Core
        </Link>
        <Typography>Breadcrumbs</Typography> */}

        {data.map((breadcrumb, i) => {
          if (breadcrumb.link) {
            return (
              <NextLink href={breadcrumb.link} passHref key={i}>
                <Link underline="hover" color="inherit">
                  {breadcrumb.title}
                </Link>
              </NextLink>
            )
          } else {
            return <Typography key={i}>{breadcrumb.title}</Typography>
          }
        })}
      </Breadcrumbs>
    </Box>
  )
}

export default Breadcrumb
