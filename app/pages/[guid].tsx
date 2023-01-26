import React from 'react'
import { GetServerSideProps, NextPage } from 'next/types'
import { useRouter } from 'next/router'
import { dehydrate, QueryClient } from 'react-query'
import { NextSeo } from 'next-seo'
import ArticleService from '@/services/ArticleService'
import IPageProps from '@/models/IPageProps'
import useArticleQuery from '@/hooks/queries/useArticleQuery'
import ArticleDetail from '@/components/ArticleDetail'
import Breadcrumb, { IBreadCrumb } from '@/components/Breadcrumb'
import GlobalStore from '@/utils/GlobalStore'

interface IGuid extends IPageProps {
  currentIpAdressIsLiked: boolean
}

const Guid: NextPage<IGuid> = ({
  settings,
  userIpAdress,
  currentIpAdressIsLiked,
}: IGuid) => {
  const { query } = useRouter()
  const guid = !query.guid ? '' : query.guid

  const { articleGetByGuidQuery } = useArticleQuery()
  const { data, isSuccess } = articleGetByGuidQuery(guid as string)
  const url = `${settings.siteUrl}/${data?.guid}`

  const breadcrumb: IBreadCrumb[] = [
    {
      title: isSuccess && data ? data.title : '',
      link: null,
    },
  ]

  if (isSuccess && data) {
    return (
      <>
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
        <ArticleDetail
          data={data}
          currentIpAdressIsLiked={currentIpAdressIsLiked}
        />
      </>
    )
  }

  return <></>
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const guid = !query.guid ? '' : query.guid
  const userIpAdress: string = GlobalStore.get('userIpAdress')

  const queryClient = new QueryClient()

  const { articleByGuidPreFetchQuery } = useArticleQuery()
  await articleByGuidPreFetchQuery(queryClient, guid as string)

  const currentIpAdressIsLiked = await ArticleService.getLikeIPCheck(
    guid as string,
    userIpAdress,
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      currentIpAdressIsLiked,
    },
  }
}

export default Guid
