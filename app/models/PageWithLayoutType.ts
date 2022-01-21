import { NextPage } from 'next'
import { BlogPageLayout, FullPageLayout } from '@/layouts'

type PageWithFullPageLayoutType = NextPage & { layout: typeof FullPageLayout }
type PageWithBlogPageLayoutType = NextPage & { layout: typeof BlogPageLayout }

type PageWithLayoutType =
  | PageWithFullPageLayoutType
  | PageWithBlogPageLayoutType

export default PageWithLayoutType
