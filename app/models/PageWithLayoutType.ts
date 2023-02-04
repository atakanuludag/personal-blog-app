import { NextPage } from 'next'
import { LayoutBlogPage, LayoutAdminPage } from '@/layouts'

type PageWithBlogPageLayoutType<T> = NextPage<T> & {
  layout: typeof LayoutBlogPage
}
type PageWithAdminPageLayoutType<T> = NextPage<T> & {
  layout: typeof LayoutAdminPage
}

type PageWithLayoutType<T> =
  | PageWithBlogPageLayoutType<T>
  | PageWithAdminPageLayoutType<T>

export default PageWithLayoutType
