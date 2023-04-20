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
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

// ** components
import ArticleItem from '@/components/ArticleItem'
import Pagination from '@/components/Pagination'
import SearchInput from '@/components/SearchInput'

// ** hooks
import useArticleQuery from '@/hooks/queries/useArticleQuery'
import useRefScroll from '@/hooks/useRefScroll'

// ** models
import PageProps from '@/models/AppPropsModel'
import ListQueryModel from '@/models/ListQueryModel'

// ** config
import { PAGE_SIZE } from '@/config'

type SearchProps = {
  s: string | undefined
} & PageProps

const sType = 'title,shortDescription,content'

const Search: NextPage<SearchProps> = ({ s }: SearchProps) => {
  const [params, setParams] = useState<ListQueryModel>({
    page: 1,
    pageSize: PAGE_SIZE,
    s,
    sType,
  })
  const { articleInfiniteQuery } = useArticleQuery(params)
  const {
    data,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isFetching,
    isFetchingNextPage,
  } = articleInfiniteQuery(!s ? false : true)
  const loading = isLoading || isFetching || isFetchingNextPage

  const articleRef = useRef<HTMLDivElement>(null)
  const refScroll = useRefScroll(articleRef)

  return (
    <Fragment>
      {s ? (
        <Paper
          elevation={1}
          component="header"
          sx={{ padding: 1, paddingRight: 2, paddingLeft: 2, marginBottom: 3 }}
        >
          <Typography
            component="h1"
            variant="subtitle1"
            fontWeight="bold"
          >{`Arama Sonuçları: ${s}`}</Typography>
        </Paper>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={'100%'}
        >
          <SearchInput sx={{ width: '40%' }} />
        </Box>
      )}

      {s && data?.pages && (
        <Fragment>
          <Box component="section">
            <TransitionGroup>
              {data?.pages.map((p) =>
                p.results.map((item) => (
                  <Collapse key={item._id} addEndListener={refScroll}>
                    <ArticleItem data={item} ref={articleRef} />
                  </Collapse>
                )),
              )}
            </TransitionGroup>
          </Box>

          <Box component="section" hidden={!hasNextPage}>
            <Pagination
              type="moreButtonServerSide"
              params={params}
              setParams={setParams}
              fetchNextPage={fetchNextPage}
              loading={loading}
            />
          </Box>
        </Fragment>
      )}
    </Fragment>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const s = query?.s as string | undefined
  const queryClient = new QueryClient()

  if (!s) return { props: {} }

  const { articlePrefetchInfiniteQuery } = useArticleQuery({
    paging: 1,
    page: 1,
    pageSize: PAGE_SIZE,
    sType,
    s,
  })
  await articlePrefetchInfiniteQuery(queryClient)

  return {
    props: {
      s,
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  }
}

export default Search
