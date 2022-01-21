import React from 'react'
import { NextPage } from 'next/types'
import IPageProps from '@/models/IPageProps'
import FullPageLayout from '@/layouts/FullPageLayout'

type AdminHomeComponent = NextPage<IPageProps> & {
  layout: typeof FullPageLayout
}

const AdminHome: AdminHomeComponent = ({ settings }: IPageProps) => {
  return <>Admin test</>
}

AdminHome.layout = FullPageLayout
export default AdminHome
