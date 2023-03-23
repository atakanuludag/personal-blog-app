import { NextPage } from 'next/types'
import PageProps from '@/models/AppPropsModel'
import LayoutAdminPage from '@/layouts/LayoutAdminPage'
import LayoutBlogPage from '@/layouts/LayoutBlogPage'
import LayoutFullPage from '@/layouts/LayoutFullPage'

type NextPageType = NextPage<PageProps> & {
  layout: typeof LayoutAdminPage | typeof LayoutBlogPage | typeof LayoutFullPage
  title?: string
}

export default NextPageType
