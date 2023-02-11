// ** react
import { Fragment } from 'react'

// ** next
import { GetStaticPaths, GetStaticProps, NextPage } from 'next/types'

// ** third party
import { NextSeo } from 'next-seo'

// ** services
import ArticleService from '@/services/ArticleService'
import PageService from '@/services/PageService'

// ** components
import Breadcrumb, { IBreadCrumb } from '@/components/Breadcrumb'
import ArticleDetail from '@/components/ArticleDetail'
import PageDetail from '@/components/PageDetail'

// ** models
import IPageProps from '@/models/IPageProps'
import IArticle from '@/models/IArticle'
import IPage from '@/models/IPage'

type GuidProps = {
  currentIpAdressIsLiked: boolean
  data: IArticle | IPage
  dataType: 'article' | 'page'
} & IPageProps

type StaticPathParams = {
  guid?: string
}

const Guid: NextPage<GuidProps> = ({
  settings,
  userIpAdress,
  currentIpAdressIsLiked,
  data,
  dataType,
}: GuidProps) => {
  const url = `${settings.siteUrl}/${data.guid}`

  const breadcrumb: IBreadCrumb[] = [
    {
      title: data.title,
      link: null,
    },
  ]

  return (
    <Fragment>
      <NextSeo
        title={data.title}
        description={data.shortDescription}
        canonical={url}
        openGraph={{
          type: 'article',
          locale: 'tr_TR',
          title: data.title,
          url: url,
          site_name: settings.siteTitle,
        }}
      />
      <Breadcrumb data={breadcrumb} />
      {dataType === 'article' ? (
        <ArticleDetail
          data={data as IArticle}
          currentIpAdressIsLiked={currentIpAdressIsLiked}
        />
      ) : (
        <PageDetail data={data as IPage} />
      )}
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

  let dataType: 'article' | 'page' | null = null
  let data: IArticle | IPage | null = null
  const article = await ArticleService.getItemByGuid(guid)
  if (!article || !article?.guid) {
    const page = await PageService.getItemByGuid(guid)
    if (page && page?.guid) {
      data = page
      dataType = 'page'
    }
  } else {
    data = article
    dataType = 'article'
  }

  if (!data) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      data,
      dataType,
      guid,
    },
  }
}

export const getStaticPaths: GetStaticPaths<StaticPathParams> = async () => {
  const articles = await ArticleService.getItems()
  const pages = await PageService.getItems()

  const articlePaths = (articles as IArticle[]).map((article) => ({
    params: { guid: article.guid },
  }))
  const pagePaths = (pages as IPage[]).map((page) => ({
    params: { guid: page.guid },
  }))
  const paths = [...articlePaths, ...pagePaths]
  return { paths, fallback: 'blocking' }
}

export default Guid
