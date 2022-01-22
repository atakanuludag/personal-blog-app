import React from 'react'
import { NextPage } from 'next/types'
import IPageProps from '@/models/IPageProps'
import LayoutAdminPage from '@/layouts/LayoutAdminPage'

type AdminHomeComponent = NextPage<IPageProps> & {
  layout: typeof LayoutAdminPage
}

const AdminHome: AdminHomeComponent = ({ settings }: IPageProps) => {
  return <>Admin test</>
}

AdminHome.layout = LayoutAdminPage
export default AdminHome
