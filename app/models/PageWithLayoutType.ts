import { NextPage } from 'next'
import { LayoutBlogPage, LayoutAdminPage } from '@/layouts'

type PageWithBlogPageLayoutType<T> = NextPage<T> & {
  layout: typeof LayoutBlogPage
  title?: string
}
type PageWithAdminPageLayoutType<T> = NextPage<T> & {
  layout: typeof LayoutAdminPage
  title?: string
}

type PageWithLayoutType<T> =
  | PageWithBlogPageLayoutType<T>
  | PageWithAdminPageLayoutType<T>

export default PageWithLayoutType
