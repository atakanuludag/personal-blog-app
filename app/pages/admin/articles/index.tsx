// ** react
import React, { useState } from 'react'

// ** next
import { NextPage } from 'next/types'
import { default as NextLink } from 'next/link'

// ** mui
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid/models'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

// ** third party
import moment from 'moment'

// ** models
import IPageProps from '@/models/IPageProps'
import IArticle from '@/models/IArticle'
import IListQuery from '@/models/IListQuery'

// ** layouts
import LayoutAdminPage from '@/layouts/LayoutAdminPage'

// ** utilis
import getServerSideProps from '@/utils/AdminServerSideProps'

// ** hooks
import useArticleQuery from '@/hooks/queries/useArticleQuery'

// ** components
import DataGrid from '@/components/datagrid'
import SearchInput from '@/components/admin/SearchInput'

type AdminComponent = NextPage<IPageProps> & {
  layout: typeof LayoutAdminPage
  title: string
}

const AdminArticleIndex: AdminComponent = ({ settings }: IPageProps) => {
  const [params, setParams] = useState<IListQuery>({
    page: 1,
    pageSize: settings.pageSize,
  })
  const { articleQuery } = useArticleQuery(params)
  const { data, isSuccess, isLoading, isFetching } = articleQuery()
  const loading = isLoading || isFetching

  const columns: GridColDef[] = [
    {
      field: 'title',
      headerName: 'Başlık',
      width: 450,
      renderCell: ({ row }: GridRenderCellParams<any, IArticle, any>) => (
        <Link component={NextLink} href="/">
          {row.title}
        </Link>
      ),
    },
    {
      field: 'publishingDate',
      headerName: 'Tarih',
      width: 200,
      renderCell: ({ row }: GridRenderCellParams<any, IArticle, any>) =>
        moment(new Date(row.publishingDate)).format('DD/MM/YYYY - HH:mm'),
    },
    {
      field: 'categories',
      headerName: 'Kategoriler',
      width: 410,
      renderCell: ({ row }: GridRenderCellParams<any, IArticle, any>) =>
        row.categories.map((v) => v.title).join(', '),
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
              Makaleler
            </Typography>
            <Button variant="contained" size="small">
              Yeni ekle
            </Button>
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
        loading={loading}
        columns={columns}
        data={data?.results as any}
        pageSize={params.pageSize as number}
        page={params.page as number}
        totalResults={data?.totalResults as number}
        params={params}
        setParams={setParams}
      />
    </Box>
  )
}

AdminArticleIndex.layout = LayoutAdminPage
AdminArticleIndex.title = 'Makaleler'
export default AdminArticleIndex

export { getServerSideProps }
