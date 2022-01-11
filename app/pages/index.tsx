import React, { useState } from 'react'
import type { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { QUERY_NAMES } from '@/core/Constants'
import ArticleService from '@/services/ArticleService'
import IArticle from '@/models/IArticle'
import ArticleItem from '@/components/ArticleItem'
import Pagination from '@/components/Pagination'

import useArticleQuery from '@/hooks/queries/useArticleQuery'
import useStoreArticle from '@/hooks/useStoreArticle'

import Box from '@mui/material/Box'

interface IHomeProps {}

const service = new ArticleService()

const Home: NextPage<IHomeProps> = () => {
  const { articleParams } = useStoreArticle()
  const { articleQuery } = useArticleQuery(articleParams)
  const article = articleQuery()

  if (article.isSuccess) {
    return (
      <>
        <Box component="section">
          {article.data.results.map((item) => (
            <ArticleItem key={item.id} item={item} />
          ))}
        </Box>

        <Box component="section" hidden={!article.data.hasNextPage}>
          <Pagination />
        </Box>
      </>
    )
  }

  return <></>
}

export const getStaticProps: GetStaticProps = async (context) => {
  const queryClient = new QueryClient()

  const { articlePreFetchQuery } = useArticleQuery({
    page: 1,
    pageSize: 2,
  })
  await articlePreFetchQuery(queryClient)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default Home
