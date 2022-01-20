import React from 'react'
import { GetServerSideProps, NextPage } from 'next/types'
import { useRouter } from 'next/router'
import { dehydrate, QueryClient } from 'react-query'
import { NextSeo } from 'next-seo'
import Box from '@mui/material/Box'
import IPageProps from '@/models/IPageProps'
import useArticleQuery from '@/hooks/queries/useArticleQuery'
import useStoreArticle from '@/hooks/useStoreArticle'

import ArticleDetail from '@/components/ArticleDetail'

const Guid: NextPage<IPageProps> = ({ settings }: IPageProps) => {
  const { query } = useRouter()
  const guid = !query.guid ? '' : query.guid

  const { articleParamsStore } = useStoreArticle()
  const { articleGetByGuidQuery } = useArticleQuery(articleParamsStore)
  const { data, isSuccess } = articleGetByGuidQuery(guid as string)
  const url = `${settings.siteUrl}/${data?.guid}`

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
        <ArticleDetail data={data} />
        {/* <Box component="section">
          <p>{data.title}</p>
        </Box> */}
      </>
    )
  }

  return <></>
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const guid = !query.guid ? '' : query.guid
  const queryClient = new QueryClient()

  const { articleByGuidPreFetchQuery } = useArticleQuery()
  await articleByGuidPreFetchQuery(queryClient, guid as string)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default Guid
