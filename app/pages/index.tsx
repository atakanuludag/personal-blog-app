import React, { useRef } from 'react'
import { GetServerSideProps, NextPage } from 'next/types'
import { dehydrate } from 'react-query'
import { TransitionGroup } from 'react-transition-group'
import Collapse from '@mui/material/Collapse'
import Box from '@mui/material/Box'
import ArticleItem from '@/components/ArticleItem'
import Pagination from '@/components/Pagination'
import useArticleQuery from '@/hooks/queries/useArticleQuery'
import useStoreArticle from '@/hooks/useStoreArticle'
import useRefScroll from '@/hooks/useRefScroll'

interface IHomeProps {}

const Home: NextPage<IHomeProps> = () => {
  const { articleParamsStore } = useStoreArticle()
  const { articleQuery } = useArticleQuery(articleParamsStore)
  const article = articleQuery()
  const articleRef = useRef<HTMLDivElement>(null)
  const refScroll = useRefScroll(articleRef)

  if (article.isSuccess) {
    return (
      <>
        <Box component="section">
          <TransitionGroup>
            {article.data.pages.map((p) =>
              p.results.map((item) => (
                <Collapse key={item.id} addEndListener={refScroll}>
                  <ArticleItem key={item.id} item={item} ref={articleRef} />
                </Collapse>
              )),
            )}
          </TransitionGroup>
        </Box>

        <Box component="section" hidden={!article.hasNextPage}>
          <Pagination />
        </Box>
      </>
    )
  }

  return <></>
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { queryClient, articlePreFetchQuery } = useArticleQuery({
    page: 1,
    pageSize: 2, //todo: pageSize settings
  })
  await articlePreFetchQuery()

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  }
}

export default Home
