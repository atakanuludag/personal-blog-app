import React from 'react'
import { GetServerSideProps, NextPage } from 'next/types'
import moment from 'moment'
import IPageProps from '@/models/IPageProps'
import LayoutAdminPage from '@/layouts/LayoutAdminPage'
import Cookie from '@/utils/Cookie'
import IToken from '@/models/IToken'
import { ITableCell } from '@/models/ITable'
import ICategory from '@/models/ICategory'
import useArticleQuery from '@/hooks/queries/useArticleQuery'

import Table from '@/components/table/Table'

type AdminHomeComponent = NextPage<IPageProps> & {
  layout: typeof LayoutAdminPage
}

const AdminHome: AdminHomeComponent = ({ settings }: IPageProps) => {
  const { articleQuery } = useArticleQuery()
  const { data, isSuccess, hasNextPage, isLoading, isFetching } = articleQuery()

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
  return (
    <>
      <Table
        loading={isLoading || isFetching}
        cells={cells}
        rows={data?.pages[0].results as any}
      />
    </>
  )

  return <></>
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const { getCookie } = Cookie(req, res)
  const auth: IToken | null = getCookie('auth', true)

  if (auth) {
    return {
      props: {},
    }
  }

  return {
    redirect: {
      permanent: false,
      destination: '/admin/login',
    },
  }
}

AdminHome.layout = LayoutAdminPage
export default AdminHome
