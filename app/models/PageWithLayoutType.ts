import { NextPage } from 'next'
import { LayoutBlogPage, LayoutAdminPage } from '@/layouts'

type PageWithBlogPageLayoutType = NextPage & { layout: typeof LayoutBlogPage }
type PageWithAdminPageLayoutType = NextPage & {
  layout: typeof LayoutAdminPage
}

type PageWithLayoutType =
  | PageWithBlogPageLayoutType
  | PageWithAdminPageLayoutType

export default PageWithLayoutType
