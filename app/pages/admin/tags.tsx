// ** react
import { useState } from 'react'

// ** mui
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid/models'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'

// ** third party
import moment from 'moment'

// ** services
import TagService from '@/services/TagService'

// ** models
import PageProps from '@/models/AppPropsModel'
import TagModel from '@/models/TagModel'
import ListQueryModel from '@/models/ListQueryModel'
import ListResponseModel from '@/models/ListResponseModel'
import NextPageType from '@/models/NextPageType'

// ** layouts
import LayoutAdminPage from '@/layouts/LayoutAdminPage'

// ** utils
import getServerSideProps from '@/utils/AdminServerSideProps'

// ** hooks
import useTagQuery from '@/hooks/queries/useTagQuery'

// ** components
import DataGrid from '@/components/datagrid'
import SearchInput from '@/components/admin/SearchInput'

// ** constants
import { QUERY_NAMES } from '@/core/Constants'

const Tags: NextPageType = ({ settings }: PageProps) => {
  const [params, setParams] = useState<ListQueryModel>({
    page: 1,
    pageSize: settings.pageSize,
  })

  const [customLoading, setCustomLoading] = useState(false)

  const { tagQuery } = useTagQuery(params)

  const { data, isLoading, isFetching } = tagQuery()
  const items = data as ListResponseModel<TagModel[]>
  const loading = isLoading || isFetching || customLoading

  const columns: GridColDef[] = [
    {
      field: 'title',
      headerName: 'Başlık',
      width: 250,
    },
    {
      field: 'guid',
      headerName: 'Link',
      width: 200,
    },
    {
      field: 'createdAt',
      headerName: 'Oluşturma Tarihi',
      width: 200,
      renderCell: ({ row }: GridRenderCellParams<any, TagModel, any>) =>
        moment(new Date(row.createdAt)).format('DD/MM/YYYY - HH:mm'),
    },
    {
      field: 'updatedAt',
      headerName: 'Güncelleme Tarihi',
      width: 200,
      renderCell: ({ row }: GridRenderCellParams<any, TagModel, any>) =>
        moment(new Date(row.updatedAt)).format('DD/MM/YYYY - HH:mm'),
    },
  ]

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
              Etiketler
            </Typography>
          </Stack>
        </Grid>

        <Grid item md={3} xs={12}>
          <SearchInput
            loading={loading}
            params={params}
            setParams={setParams}
          />
        </Grid>
      </Grid>

      <DataGrid
        queryName={QUERY_NAMES.TAG}
        loading={loading}
        setCustomLoading={setCustomLoading}
        deleteService={TagService.deleteItem}
        columns={columns}
        rows={items?.results || []}
        pageSize={params.pageSize as number}
        page={params.page as number}
        totalResults={items?.totalResults as number}
        params={params}
        setParams={setParams}
        deleteDialogMessage="Seçtiğiniz etiketlere bağlı makaleler olabilir. Gerçekten silmek istiyor musunuz ?"
      />
    </Box>
  )
}

Tags.layout = LayoutAdminPage
Tags.title = 'Etiketler'
export default Tags

export { getServerSideProps }
