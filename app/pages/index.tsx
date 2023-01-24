import React, { Fragment, useRef } from 'react'
import { NextPage, GetServerSideProps } from 'next/types'
import { dehydrate, QueryClient } from 'react-query'
import { TransitionGroup } from 'react-transition-group'
import Collapse from '@mui/material/Collapse'
import Box from '@mui/material/Box'
import ArticleItem from '@/components/ArticleItem'
import Pagination from '@/components/Pagination'
import useArticleQuery from '@/hooks/queries/useArticleQuery'
import useStoreArticle from '@/hooks/useStoreArticle'
import useRefScroll from '@/hooks/useRefScroll'
import IPageProps from '@/models/IPageProps'
import ISettings from '@/models/ISettings'
import GlobalStore from '@/utils/GlobalStore'

const Home: NextPage<IPageProps> = ({ settings }: IPageProps) => {
  const { articleParamsStore } = useStoreArticle()
  const { articleQuery } = useArticleQuery({
    ...articleParamsStore,
    pageSize: settings.pageSize,
  })
  const { data, isSuccess, hasNextPage } = articleQuery()
  const articleRef = useRef<HTMLDivElement>(null)
  const refScroll = useRefScroll(articleRef)

  if (isSuccess && data) {
    return (
      <Fragment>
        <Box component="section">
          <TransitionGroup>
            {data.pages.map((p) =>
              p.results.map((item) => (
                <Collapse key={item.id} addEndListener={refScroll}>
                  <ArticleItem key={item.id} data={item} ref={articleRef} />
                </Collapse>
              )),
            )}
          </TransitionGroup>
        </Box>

        <Box component="section" hidden={!hasNextPage}>
          <Pagination />
        </Box>
      </Fragment>
    )
  }

  return <Fragment> </Fragment>
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const queryClient = new QueryClient()
  const settings: ISettings = GlobalStore.get('settings')
  const { articlePreFetchQuery } = useArticleQuery({
    page: 1,
    pageSize: settings.pageSize,
  })
  await articlePreFetchQuery(queryClient)

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  }
}

export default Home
