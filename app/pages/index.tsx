import React, { useState } from 'react'
import type { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import ArticleService from '@/services/ArticleService'
import IArticle from '@/models/IArticle'
import ArticleItem from '@/components/ArticleItem'
import Pagination from '@/components/Pagination'

import useArticleQuery from '@/hooks/queries/useArticleQuery'
import { dehydrate, QueryClient } from 'react-query'

import Box from '@mui/material/Box'

interface IHomeProps {}

const service = new ArticleService()

const Home: NextPage<IHomeProps> = () => {
  //const [items] = useState<IArticle[]>([])

  const { articleQuery } = useArticleQuery()
  const article = articleQuery()
  console.log('article', article.data)
  if (article.isSuccess)
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

  return <></>
}

export default Home

// export const getServerSideProps: GetServerSideProps = async ({}) => {
//   let props: IHomeProps = {
//     items: new Array<IArticle>(),
//   }

//   const test = await service.getItems()
//   props.items = test.results

//   return { props }
// }

export const getStaticProps: GetStaticProps = async (context) => {
  const queryClient = new QueryClient()

  const { articlePreFetchQuery } = useArticleQuery()
  await articlePreFetchQuery(queryClient)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
