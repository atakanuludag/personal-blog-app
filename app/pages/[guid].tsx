import { Fragment } from 'react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next/types'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import ArticleService from '@/services/ArticleService'
import IPageProps from '@/models/IPageProps'
import IArticle from '@/models/IArticle'
import ArticleDetail from '@/components/ArticleDetail'
import Breadcrumb, { IBreadCrumb } from '@/components/Breadcrumb'
import { ParsedUrlQuery } from 'querystring'
interface IGuid extends IPageProps {
  currentIpAdressIsLiked: boolean
  article: IArticle
}

const Guid: NextPage<IGuid> = ({
  settings,
  userIpAdress,
  currentIpAdressIsLiked,
  article,
}: IGuid) => {
  const { query } = useRouter()
  const guid = !query.guid ? '' : query.guid

  const url = `${settings.siteUrl}/${article.guid}`

  const breadcrumb: IBreadCrumb[] = [
    {
      title: article.title,
      link: null,
    },
  ]

  return (
    <Fragment>
      <NextSeo
        title={article.title}
        description={article.shortDescription}
        canonical={url}
        openGraph={{
          type: 'article',
          locale: 'tr_TR',
          title: article.title,
          url: url,
          site_name: settings.siteTitle,
        }}
      />
      <Breadcrumb data={breadcrumb} />
      <ArticleDetail
        data={article}
        currentIpAdressIsLiked={currentIpAdressIsLiked}
      />
    </Fragment>
  )
}

interface Params extends ParsedUrlQuery {
  guid?: string
}

export const getStaticProps: GetStaticProps<any, Params> = async ({
  params,
}) => {
  const guid = params?.guid

  if (!guid) {
    return {
      notFound: true,
    }
  }

  const article = await ArticleService.getItemByGuid(guid)
  if (!article) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      article,
      guid,
    },
  }
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const articles = await ArticleService.getItems()
  const paths = articles.results.map((article) => ({
    params: { guid: article.guid },
  }))
  return { paths, fallback: 'blocking' }
}

export default Guid
