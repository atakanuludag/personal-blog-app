// ** react
import { Fragment } from 'react'

// ** next
import { GetStaticPaths, GetStaticProps, NextPage } from 'next/types'
import { useRouter } from 'next/router'

// ** third party
import { NextSeo } from 'next-seo'

// ** services
import ArticleService from '@/services/ArticleService'

// ** components
import Breadcrumb, { IBreadCrumb } from '@/components/Breadcrumb'
import ArticleDetail from '@/components/ArticleDetail'

// ** models
import IPageProps from '@/models/IPageProps'
import IArticle from '@/models/IArticle'

type ArticleGuidProps = {
  currentIpAdressIsLiked: boolean
  article: IArticle
} & IPageProps

type StaticPathParams = {
  guid?: string
}

const ArticleGuid: NextPage<ArticleGuidProps> = ({
  settings,
  userIpAdress,
  currentIpAdressIsLiked,
  article,
}: ArticleGuidProps) => {
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

export const getStaticProps: GetStaticProps<any, StaticPathParams> = async ({
  params,
}) => {
  const guid = params?.guid

  if (!guid) {
    return {
      notFound: true,
    }
  }

  const article = await ArticleService.getItemByGuid(guid)
  if (!article || !article.guid) {
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

export const getStaticPaths: GetStaticPaths<StaticPathParams> = async () => {
  const articles = await ArticleService.getItems()
  const paths = (articles as IArticle[]).map((article) => ({
    params: { guid: article.guid },
  }))
  return { paths, fallback: 'blocking' }
}

export default ArticleGuid
