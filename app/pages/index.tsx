// ** react
import { Fragment, useRef, useState } from 'react'

// ** next
import { NextPage, GetServerSideProps } from 'next/types'

// ** third party
import { dehydrate, QueryClient } from 'react-query'
import { TransitionGroup } from 'react-transition-group'

// ** mui
import Collapse from '@mui/material/Collapse'
import Box from '@mui/material/Box'

// ** components
import ArticleItem from '@/components/ArticleItem'
import Pagination from '@/components/Pagination'

// ** hooks
import useArticleQuery from '@/hooks/queries/useArticleQuery'
import useRefScroll from '@/hooks/useRefScroll'

// ** models
import PageProps from '@/models/AppPropsModel'
import ListQueryModel from '@/models/ListQueryModel'

// ** config
import { PAGE_SIZE } from '@/config'

const Home: NextPage<PageProps> = ({}: PageProps) => {
  const [params, setParams] = useState<ListQueryModel>({
    page: 1,
    pageSize: PAGE_SIZE,
  })
  const { articleInfiniteQuery } = useArticleQuery(params)
  const { data, isSuccess, hasNextPage } = articleInfiniteQuery()
  const articleRef = useRef<HTMLDivElement>(null)
  const refScroll = useRefScroll(articleRef)

  if (isSuccess && data) {
    return (
      <Fragment>
        <Box component="section">
          <TransitionGroup>
            {data.pages.map((p) =>
              p.results.map((item) => (
                <Collapse key={item._id} addEndListener={refScroll}>
                  <ArticleItem data={item} ref={articleRef} />
                </Collapse>
              )),
            )}
          </TransitionGroup>
        </Box>

        <Box component="section" hidden={!hasNextPage}>
          <Pagination params={params} setParams={setParams} />
        </Box>
      </Fragment>
    )
  }

  return <Fragment> </Fragment>
}

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient()
  const { articlePrefetchInfiniteQuery } = useArticleQuery({
    page: 1,
    pageSize: PAGE_SIZE,
  })
  await articlePrefetchInfiniteQuery(queryClient)

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  }
}

export default Home
