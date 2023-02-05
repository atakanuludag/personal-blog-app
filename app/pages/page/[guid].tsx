// ** react
import React, { Fragment } from 'react'

// ** next
import { GetStaticPaths, GetStaticProps, NextPage } from 'next/types'

// ** third party
import { NextSeo } from 'next-seo'

// ** models
import IPageProps from '@/models/IPageProps'
import IPage from '@/models/IPage'

// ** components
import PageDetail from '@/components/PageDetail'
import Breadcrumb, { IBreadCrumb } from '@/components/Breadcrumb'

// ** services
import PageService from '@/services/PageService'

type StaticPathParams = {
  guid?: string
}
type PageGuidProps = {
  page: IPage
} & IPageProps

const PageGuid: NextPage<PageGuidProps> = ({
  settings,
  page,
}: PageGuidProps) => {
  const url = `${settings.siteUrl}/${page.guid}`

  const breadcrumb: IBreadCrumb[] = [
    {
      title: page.title,
      link: null,
    },
  ]

  return (
    <Fragment>
      <NextSeo
        title={page.title}
        description={page.shortDescription}
        canonical={url}
        openGraph={{
          type: 'article',
          locale: 'tr_TR',
          title: page.title,
          url: url,
          site_name: settings.siteTitle,
        }}
      />
      <Breadcrumb data={breadcrumb} />
      <PageDetail data={page} />
    </Fragment>
  )
}

export const getStaticProps: GetStaticProps<any, StaticPathParams> = async ({
  params,
}) => {
  const guid = params?.guid

  if (!guid) {
    return {
      notFound: true,
    }
  }

  const page = await PageService.getItemByGuid(guid)
  if (!page || !page.guid) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      page,
      guid,
    },
  }
}

export const getStaticPaths: GetStaticPaths<StaticPathParams> = async () => {
  const pages = await PageService.getItems()
  const paths = (pages as IPage[]).map((page) => ({
    params: { guid: page.guid },
  }))
  return { paths, fallback: 'blocking' }
}

export default PageGuid
