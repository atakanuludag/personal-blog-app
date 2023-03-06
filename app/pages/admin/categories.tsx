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

// ** services
import CategoryService from '@/services/CategoryService'

// ** models
import PageProps from '@/models/AppPropsModel'
import CategoryModel, { CategoryFormModel } from '@/models/CategoryModel'
import ListQueryModel from '@/models/ListQueryModel'
import ListResponseModel from '@/models/ListResponseModel'

// ** layouts
import LayoutAdminPage from '@/layouts/LayoutAdminPage'

// ** utils
import getServerSideProps from '@/utils/AdminServerSideProps'

// ** hooks
import useCategoryQuery from '@/hooks/queries/useCategoryQuery'
import useComponentContext from '@/hooks/useComponentContext'

// ** components
import DataGrid from '@/components/datagrid'
import SearchInput from '@/components/admin/SearchInput'
import NewEditCategory from '@/components/admin/categories/NewEditCategory'

// ** constants
import { QUERY_NAMES } from '@/core/Constants'

type AdminComponent = NextPage<PageProps> & {
  layout: typeof LayoutAdminPage
  title: string
}

const Categories: AdminComponent = ({ settings }: PageProps) => {
  const [params, setParams] = useState<ListQueryModel>({
    page: 1,
    pageSize: settings.pageSize,
  })

  const [customLoading, setCustomLoading] = useState(false)

  const { categoriesQuery } = useCategoryQuery(params)
  const { setFormDrawerData } = useComponentContext()

  const { data, isLoading, isFetching } = categoriesQuery()
  const items = data as ListResponseModel<CategoryModel[]>
  const loading = isLoading || isFetching || customLoading

  const columns: GridColDef[] = [
    {
      field: 'title',
      headerName: 'Başlık',
      width: 250,
      renderCell: ({ row }: GridRenderCellParams<any, CategoryModel, any>) => (
        <Link onClick={() => handleEditButton(row)} component="button">
          {row.title}
        </Link>
      ),
    },
    {
      field: 'parent',
      headerName: 'Evebeyn',
      width: 180,
      renderCell: ({ row }: GridRenderCellParams<any, CategoryModel, any>) =>
        row.parent?.title || '-',
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
      renderCell: ({ row }: GridRenderCellParams<any, CategoryModel, any>) =>
        moment(new Date(row.createdAt)).format('DD/MM/YYYY - HH:mm'),
    },
    {
      field: 'updatedAt',
      headerName: 'Güncelleme Tarihi',
      width: 200,
      renderCell: ({ row }: GridRenderCellParams<any, CategoryModel, any>) =>
        moment(new Date(row.updatedAt)).format('DD/MM/YYYY - HH:mm'),
    },
  ]

  const handleEditButton = (row: CategoryModel) => {
    const { title, description, guid, parent, _id } = row
    handleToggleNewEdittButton({
      _id,
      title,
      description,
      guid,
      parent,
    })
  }

  const handleToggleNewEdittButton = (data?: CategoryFormModel) => {
    setFormDrawerData({
      open: true,
      title: 'Yeni Kategori',
      content: <NewEditCategory data={data} />,
      submitButtonText: 'Kaydet',
      submit: false,
    })
  }

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
              Kategoriler
            </Typography>
            <Button
              variant="contained"
              size="small"
              onClick={() => handleToggleNewEdittButton()}
            >
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
        queryName={QUERY_NAMES.CATEGORY}
        loading={loading}
        setCustomLoading={setCustomLoading}
        deleteService={CategoryService.deleteItem}
        columns={columns}
        rows={items?.results || []}
        pageSize={params.pageSize as number}
        page={params.page as number}
        totalResults={items?.totalResults as number}
        params={params}
        setParams={setParams}
        deleteDialogMessage="Seçtiğiniz kategorilere bağlı makaleler olabilir. Gerçekten silmek istiyor musunuz ?"
      />
    </Box>
  )
}

Categories.layout = LayoutAdminPage
Categories.title = 'Makaleler'
export default Categories

export { getServerSideProps }
