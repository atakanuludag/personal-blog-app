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
import SettingsModel from '@/models/SettingsModel'
import ListQueryModel from '@/models/ListQueryModel'
import { ArticleListResponseModel } from '@/models/ArticleModel'

// ** utils
import GlobalStore from '@/utils/GlobalStore'

// ** services
import ArticleService from '@/services/ArticleService'
import SettingService from '@/services/SettingService'

type StaticPathParams = {
  page?: string
}

type PageProps = {
  page: number
  articles: ArticleListResponseModel
} & AppPropsModel

const Page: NextPage<PageProps> = ({ page, articles, settings }: PageProps) => {
  const [params, setParams] = useState<ListQueryModel>({
    page,
    pageSize: settings.pageSize,
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
  const settings: SettingsModel = GlobalStore.get('settings')
  const articles = (await ArticleService.getItems({
    page: page,
    pageSize: settings.pageSize,
  })) as ArticleListResponseModel

  return {
    props: {
      page,
      articles,
    },
  }
}

export const getStaticPaths: GetStaticPaths<StaticPathParams> = async () => {
  const settings = await SettingService.getItemsAsObject()
  const article = (await ArticleService.getItems({
    page: 1,
    pageSize: settings.pageSize,
  })) as ArticleListResponseModel

  const paths = [...Array(article.totalPages)].map((_, page: number) => ({
    params: { page: (page + 1).toString() },
  }))
  return { paths, fallback: 'blocking' }
}

export default Page
