import React, { useState, useEffect } from 'react'
import { NextPage } from 'next/types'
import moment from 'moment'
import IPageProps from '@/models/IPageProps'
import LayoutAdminPage from '@/layouts/LayoutAdminPage'
import getServerSideProps from '@/utils/AdminServerSideProps'
import { ITableCell } from '@/models/ITable'
import ICategory from '@/models/ICategory'
import useArticleQuery from '@/hooks/queries/useArticleQuery'

import Table from '@/components/table/Table'
import useStoreArticle from '@/hooks/useStoreArticle'
import { IArticleResponse } from '@/models/IArticle'

type AdminComponent = NextPage<IPageProps> & {
  layout: typeof LayoutAdminPage
}

const AdminHome: AdminComponent = ({ settings }: IPageProps) => {
  const { articleParamsStore, setArticleParamsStore } = useStoreArticle()
  const { articleQuery } = useArticleQuery({
    ...articleParamsStore,
    pageSize: settings.pageSize,
  })
  const { data, isSuccess, hasNextPage, isLoading, isFetching, fetchNextPage } =
    articleQuery()

  const [currentPageData, setCurrentPageData] = useState<IArticleResponse>(
    {} as any,
  )

  useEffect(() => {
    if (data && isSuccess && !isFetching && !isLoading) {
      setCurrentPageData(data?.pages[articleParamsStore.page - 1])
    }
  }, [isLoading, isFetching])

  const cells: ITableCell[] = [
    {
      id: 'title',
      numeric: false,
      label: 'Başlık',
    },
    {
      id: 'publishingDate',
      numeric: false,
      label: 'Tarih',
      formatter: (value) =>
        moment(new Date(value)).format('DD/MM/YYYY - HH:mm'),
    },
    {
      id: 'categories',
      numeric: false,
      label: 'Kategoriler',
      formatter: (values: ICategory[]) => values.map((v) => v.title).join(', '),
    },
  ]

  const handleChangePage = (event: any, newPage: number) => {
    fetchNextPage({
      pageParam: newPage,
    })
    setArticleParamsStore({
      ...articleParamsStore,
      page: newPage,
    })
  }

  console.log('currentPageData', currentPageData)
  return (
    <>
      <Table
        loading={isLoading || isFetching}
        cells={cells}
        rows={currentPageData.results}
        pageSize={articleParamsStore.pageSize}
        page={articleParamsStore.page}
        totalPages={currentPageData.totalResults}
        handleChangePage={handleChangePage}
      />
    </>
  )

  return <></>
}

AdminHome.layout = LayoutAdminPage
export default AdminHome

export { getServerSideProps }
