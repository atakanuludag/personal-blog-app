import React, { useEffect, useRef, useState } from 'react'
import type { GetStaticProps, NextPage } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { TransitionGroup } from 'react-transition-group'
import Collapse from '@mui/material/Collapse'
import Box from '@mui/material/Box'
import IArticle from '@/models/IArticle'
import ArticleItem from '@/components/ArticleItem'
import Pagination from '@/components/Pagination'
import useArticleQuery from '@/hooks/queries/useArticleQuery'
import useStoreArticle from '@/hooks/useStoreArticle'
import useRefScroll from '@/hooks/useRefScroll'

interface IHomeProps {}

const Home: NextPage<IHomeProps> = () => {
  const [items, setItems] = useState(new Array<IArticle>())
  const { articleParams } = useStoreArticle()
  const { articleQuery } = useArticleQuery(articleParams)
  const article = articleQuery()

  const articleRef = useRef<any>(null)

  const refScroll = useRefScroll(articleRef)

  useEffect(() => {
    if (article.isLoading) return
    const data = article.data?.results ? article.data.results : []
    setItems([...items, ...data])
  }, [article.isLoading])

  if (article.isSuccess) {
    return (
      <>
        <Box component="section">
          <TransitionGroup>
            {items.map((item) => (
              <Collapse key={item.id} addEndListener={refScroll}>
                <ArticleItem key={item.id} item={item} ref={articleRef} />
              </Collapse>
            ))}
          </TransitionGroup>
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
