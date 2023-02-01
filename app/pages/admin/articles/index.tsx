import React, { useState, useEffect } from 'react'
import { NextPage } from 'next/types'
import { default as NextLink } from 'next/link'
import moment from 'moment'
import IPageProps from '@/models/IPageProps'
import LayoutAdminPage from '@/layouts/LayoutAdminPage'
import getServerSideProps from '@/utils/AdminServerSideProps'
import ICategory from '@/models/ICategory'
import useArticleQuery from '@/hooks/queries/useArticleQuery'
import DataGrid from '@/components/datagrid'
import IArticle, { IArticleResponse } from '@/models/IArticle'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid/models'
import Link from '@mui/material/Link'
import IListQuery from '@/models/IListQuery'

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
      width: 250,
      renderCell: ({ row }: GridRenderCellParams<any, IArticle, any>) => (
        <Link component={NextLink} href="/">
          {row.title}
        </Link>
      ),
    },
    {
      field: 'publishingDate',
      headerName: 'Tarih',
      width: 150,
      renderCell: ({ row }: GridRenderCellParams<any, IArticle, any>) =>
        moment(new Date(row.publishingDate)).format('DD/MM/YYYY - HH:mm'),
    },
    {
      field: 'categories',
      headerName: 'Kategoriler',
      renderCell: ({ row }: GridRenderCellParams<any, IArticle, any>) =>
        row.categories.map((v) => v.title).join(', '),
    },
  ]

  const handlePageChange = (page: number) => {
    setParams({
      ...params,
      page,
    })
  }

  const handlePageSizeChange = (pageSize: number) => {
    setParams({
      ...params,
      pageSize,
    })
  }

  return (
    <DataGrid
      loading={loading}
      columns={columns}
      data={data?.results as any}
      pageSize={params.pageSize}
      page={params.page}
      totalResults={data?.totalResults as any}
      handlePageChange={handlePageChange}
      handlePageSizeChange={handlePageSizeChange}
    />
  )
}

AdminArticleIndex.layout = LayoutAdminPage
AdminArticleIndex.title = 'Makaleler'
export default AdminArticleIndex

export { getServerSideProps }
