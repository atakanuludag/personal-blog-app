import React from 'react'
import { GetServerSideProps, NextApiRequest, NextPage } from 'next/types'
import IPageProps from '@/models/IPageProps'
import LayoutAdminPage from '@/layouts/LayoutAdminPage'
import Cookie from '@/utils/Cookie'
import IToken from '@/models/IToken'

type AdminHomeComponent = NextPage<IPageProps> & {
  layout: typeof LayoutAdminPage
}

const AdminHome: AdminHomeComponent = ({ settings }: IPageProps) => {
  return <>Admin test</>
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
