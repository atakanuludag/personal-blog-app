// ** react
import { Fragment } from 'react'

// ** bext
import { NextPage, GetStaticPaths, GetStaticProps } from 'next/types'

// ** mui
import Box from '@mui/material/Box'

// ** components
import ArticleItem from '@/components/ArticleItem'
import Pagination from '@/components/Pagination'

// ** models
import AppPropsModel from '@/models/AppPropsModel'
import ListResponseModel from '@/models/ListResponseModel'
import ArticleModel from '@/models/ArticleModel'

// ** services
import ArticleService from '@/services/ArticleService'

// ** config
import { PAGE_SIZE } from '@/config'

type StaticPathParams = {
  page?: string
}

type PageProps = {
  currentPage: number
  data: ListResponseModel<ArticleModel[]>
} & AppPropsModel

const Page: NextPage<PageProps> = ({ currentPage, data }: PageProps) => {
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
          currentPage={currentPage}
        />
      </Box>
    </Fragment>
  )
}

export const getStaticProps: GetStaticProps<any, StaticPathParams> = async ({
  params,
}) => {
  const currentPage = Number(params?.page)
  if (isNaN(currentPage) || !currentPage) {
    return {
      notFound: true,
    }
  }

  const data = (await ArticleService.getItems({
    page: currentPage,
    pageSize: PAGE_SIZE,
  })) as ListResponseModel<ArticleModel[]>

  return {
    props: {
      currentPage,
      data,
    },
  }
}

export const getStaticPaths: GetStaticPaths<StaticPathParams> = async () => {
  const article = (await ArticleService.getItems({
    page: 1,
    pageSize: PAGE_SIZE,
  })) as ListResponseModel<ArticleModel[]>

  const paths = [...Array(article.totalPages)].map((_, page: number) => ({
    params: { page: (page + 1).toString() },
  }))
  return { paths, fallback: false }
}

export default Page
