// ** react
import { Fragment } from 'react'

// ** next
import { GetStaticPaths, GetStaticProps, NextPage } from 'next/types'

// ** third party
import { NextSeo } from 'next-seo'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import rehypeHighlight from 'rehype-highlight'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import bash from 'highlight.js/lib/languages/bash'
import shell from 'highlight.js/lib/languages/shell'

// ** services
import ArticleService from '@/services/ArticleService'
import PageService from '@/services/PageService'

// ** components
import Breadcrumb, { BreadcrumbDataProps } from '@/components/Breadcrumb'
import ArticleDetail from '@/components/ArticleDetail'
import PageDetail from '@/components/PageDetail'

// ** models
import PageProps from '@/models/AppPropsModel'
import ArticleModel from '@/models/ArticleModel'
import IPage from '@/models/PageModel'

// ** config
import { APP_URL, SITE_TITLE } from '@/config'

type GuidProps = {
  content: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, unknown>
  >
  currentIpAdressIsLiked: boolean
  data: ArticleModel | IPage
  dataType: 'article' | 'page'
} & PageProps

type StaticPathParams = {
  guid: string
}

const Guid: NextPage<GuidProps> = ({
  content,
  userIpAdress,
  currentIpAdressIsLiked,
  data,
  dataType,
}: GuidProps) => {
  const url = `${APP_URL}/${data.guid}`

  const breadcrumb: BreadcrumbDataProps[] = [
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
          site_name: SITE_TITLE,
        }}
      />
      <Breadcrumb data={breadcrumb} />
      {dataType === 'article' ? (
        <ArticleDetail
          data={data as ArticleModel}
          content={content}
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
  let data: ArticleModel | IPage | null = null
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

  const content = await serialize(data.content, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [
        [
          rehypeHighlight as any,
          { languages: { javascript, typescript, shell, bash } },
        ],
      ],
    },
  })

  console.log(content)

  return {
    props: {
      content,
      data,
      dataType,
      guid,
    },
  }
}

export const getStaticPaths: GetStaticPaths<StaticPathParams> = async () => {
  const articles = await ArticleService.getItems()
  const pages = await PageService.getItems()

  const articlePaths = (articles as ArticleModel[]).map((article) => ({
    params: { guid: article.guid },
  }))
  const pagePaths = (pages as IPage[]).map((page) => ({
    params: { guid: page.guid },
  }))
  const paths = [...articlePaths, ...pagePaths]
  return { paths, fallback: false }
}

export default Guid
