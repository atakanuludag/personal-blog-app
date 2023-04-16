// ** react
import { Fragment } from 'react'

// ** next
import { NextPage, GetStaticPaths, GetStaticProps } from 'next/types'

// ** mui
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

// ** services
import ArticleService from '@/services/ArticleService'
import CategoryService from '@/services/CategoryService'

// ** components
import ArticleItem from '@/components/ArticleItem'
import Pagination from '@/components/Pagination'

// ** models
import PageProps from '@/models/AppPropsModel'

// ** config
import { PAGE_SIZE, REVALIDATE_SECONDS } from '@/config'
import ArticleModel from '@/models/ArticleModel'
import ListResponseModel from '@/models/ListResponseModel'
import CategoryModel from '@/models/CategoryModel'

type StaticPathParams = {
  guid: string
}

type CategoryParamsProps = {
  data: ListResponseModel<ArticleModel[]>
  categoryData: CategoryModel
} & PageProps

const CategoryGuid: NextPage<CategoryParamsProps> = ({
  data,
  categoryData,
}: CategoryParamsProps) => {
  return (
    <Fragment>
      <Paper
        elevation={1}
        component="header"
        sx={{ padding: 1, paddingRight: 2, paddingLeft: 2, marginBottom: 3 }}
      >
        <Typography
          component="h1"
          variant="subtitle1"
          fontWeight="bold"
        >{`Kategori: ${categoryData.title}`}</Typography>
      </Paper>
      <Box component="section">
        {data.results.map((item) => (
          <ArticleItem key={item._id} data={item} />
        ))}
      </Box>

      <Box component="section">
        <Pagination
          totalPages={data.totalPages}
          currentPage={data.currentPage}
          routerQuery={[
            {
              path: 'routerUrl',
              query: 'category',
            },
            {
              path: 'guid',
              query: categoryData.guid,
            },
          ]}
        />
      </Box>
    </Fragment>
  )
}

export const getStaticProps: GetStaticProps<any, StaticPathParams> = async ({
  params,
}) => {
  if (!params?.guid) {
    return {
      notFound: true,
    }
  }

  const categoryData = await CategoryService.getItemByGuid(params?.guid)

  const articleData = (await ArticleService.getItems({
    category: categoryData._id,
    page: 1,
    pageSize: PAGE_SIZE,
    paging: 1,
  })) as ListResponseModel<ArticleModel[]>

  if (!articleData) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      data: articleData,
      categoryData,
    },
    revalidate: REVALIDATE_SECONDS,
  }
}

export const getStaticPaths: GetStaticPaths<StaticPathParams> = async () => {
  const categories = (await CategoryService.getItems({
    paging: 0,
  })) as CategoryModel[]

  const paths = categories.map((item) => ({
    params: { guid: item.guid },
  }))

  return { paths, fallback: false }
}
export default CategoryGuid
