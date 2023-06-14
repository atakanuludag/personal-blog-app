// ** mui
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// ** models
import PageProps from '@/models/AppPropsModel'
import NextPageType from '@/models/NextPageType'

// ** layouts
import LayoutAdminPage from '@/layouts/LayoutAdminPage'

// ** utils
import getServerSideProps from '@/utils/AdminServerSideProps'

// ** components
import FileBrowser from '@/components/file-browser'

const Files: NextPageType = ({}: PageProps) => {
  return (
    <Box>
      <Grid
        container
        spacing={1}
        display="flex"
        justifyContent="space-between"
        pb={3}
      >
        <Grid item md={9} xs={12} display="flex" alignItems="center">
          <Stack direction="row" spacing={1}>
            <Typography variant="h5" fontWeight={500}>
              Ortam Kütüphanesi
            </Typography>
          </Stack>
        </Grid>

        <Grid item md={3} xs={12} />
      </Grid>
      <Box sx={{ flexGrow: 1 }}>
        <FileBrowser />
      </Box>
    </Box>
  )
}

Files.layout = LayoutAdminPage
Files.title = 'Ortam Kütüphanesi'
export default Files

export { getServerSideProps }
