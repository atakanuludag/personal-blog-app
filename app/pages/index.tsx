// ** react
import { Fragment } from 'react'

// ** next
import { NextPage, GetStaticProps } from 'next/types'

// ** mui
import Box from '@mui/material/Box'

// ** components
import ArticleItem from '@/components/ArticleItem'
import Pagination from '@/components/Pagination'

// ** service
import ArticleService from '@/services/ArticleService'

// ** models
import PageProps from '@/models/AppPropsModel'
import ListResponseModel from '@/models/ListResponseModel'
import ArticleModel from '@/models/ArticleModel'

// ** config
import { PAGE_SIZE, REVALIDATE_SECONDS } from '@/config'

type HomeIndexProps = {
  data: ListResponseModel<ArticleModel[]>
} & PageProps

const Home: NextPage<HomeIndexProps> = ({ data }: HomeIndexProps) => {
  return (
    <Fragment>
      <Box component="section">
        {data.results.map((item) => (
          <ArticleItem data={item} key={item._id} />
        ))}
      </Box>

      <Box component="section">
        <Pagination
          routerUrl={`page`}
          totalPages={data.totalPages}
          currentPage={data.currentPage}
        />
      </Box>
    </Fragment>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const data = (await ArticleService.getItems({
    page: 1,
    pageSize: PAGE_SIZE,
  })) as ListResponseModel<ArticleModel[]>

  return {
    props: {
      data,
    },
    revalidate: REVALIDATE_SECONDS,
  }
}

export default Home
