// ** react
import { Fragment, useState } from 'react'

// ** bext
import { NextPage, GetStaticPaths, GetStaticProps } from 'next/types'

// ** mui
import Box from '@mui/material/Box'

// ** components
import ArticleItem from '@/components/ArticleItem'
import Pagination from '@/components/Pagination'

// ** models
import AppPropsModel from '@/models/AppPropsModel'
import ListQueryModel from '@/models/ListQueryModel'
import ListResponseModel from '@/models/ListResponseModel'
import ArticleModel from '@/models/ArticleModel'

// ** utils
import GlobalStore from '@/utils/GlobalStore'

// ** services
import ArticleService from '@/services/ArticleService'

// ** config
import { PAGE_SIZE } from '@/config'

type StaticPathParams = {
  page?: string
}

type PageProps = {
  page: number
  articles: ListResponseModel<ArticleModel[]>
} & AppPropsModel

const Page: NextPage<PageProps> = ({ page, articles }: PageProps) => {
  const [params, setParams] = useState<ListQueryModel>({
    page,
    pageSize: PAGE_SIZE,
  })
  return (
    <Fragment>
      <Box component="section">
        {articles.results.map((item) => (
          <ArticleItem key={item._id} data={item} />
        ))}
      </Box>

      <Box component="section">
        <Pagination
          type="pagination"
          params={params}
          setParams={setParams}
          totalPages={articles.totalPages}
        />
      </Box>
    </Fragment>
  )
}

export const getStaticProps: GetStaticProps<any, StaticPathParams> = async ({
  params,
}) => {
  const page = Number(params?.page)
  if (isNaN(page) || !page) {
    return {
      notFound: true,
    }
  }

  const articles = (await ArticleService.getItems({
    page: page,
    pageSize: PAGE_SIZE,
  })) as ListResponseModel<ArticleModel[]>

  return {
    props: {
      page,
      articles,
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
  return { paths, fallback: 'blocking' }
}

export default Page
