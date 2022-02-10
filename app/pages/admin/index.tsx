import React from 'react'
import { NextPage } from 'next/types'
import IPageProps from '@/models/IPageProps'
import LayoutAdminPage from '@/layouts/LayoutAdminPage'
import getServerSideProps from '@/utils/AdminServerSideProps'

type AdminComponent = NextPage<IPageProps> & {
  layout: typeof LayoutAdminPage
}

const AdminHome: AdminComponent = ({ settings }: IPageProps) => {
  return <>Admin test</>
}

AdminHome.layout = LayoutAdminPage
export default AdminHome

export { getServerSideProps }
