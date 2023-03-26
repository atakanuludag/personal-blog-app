// ** react
import { useState } from 'react'

// ** mui
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// ** models
import PageProps from '@/models/AppPropsModel'
import FileModel, { FileListQueryModel } from '@/models/FileModel'
import ListResponseModel from '@/models/ListResponseModel'
import NextPageType from '@/models/NextPageType'
import { OrderType } from '@/models/enums'

// ** layouts
import LayoutAdminPage from '@/layouts/LayoutAdminPage'

// ** utils
import getServerSideProps from '@/utils/AdminServerSideProps'

// ** hooks
import useFileQuery from '@/hooks/queries/useFileQuery'

// ** components
import FileBrowser from '@/components/file-browser'

const Files: NextPageType = ({}: PageProps) => {
  const [params, setParams] = useState<FileListQueryModel>({
    page: 1,
    pageSize: 9999, //todo: paging yapılacak.
    folderId: null,
    order: 'isFolder',
    orderBy: OrderType.ASC,
  })

  const { filesQuery } = useFileQuery(params)

  const { data, isLoading, isFetching } = filesQuery()
  const items = data as ListResponseModel<FileModel[]>
  const loading = isLoading || isFetching

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

        <Grid item md={3} xs={12}>
          {' '}
        </Grid>
      </Grid>
      <Box sx={{ flexGrow: 1 }}>
        <FileBrowser
          items={items}
          loading={loading}
          params={params}
          setParams={setParams}
        />
      </Box>
    </Box>
  )
}

Files.layout = LayoutAdminPage
Files.title = 'Ortam Kütüphanesi'
export default Files

export { getServerSideProps }
