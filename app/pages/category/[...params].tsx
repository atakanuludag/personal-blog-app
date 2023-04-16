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
  params: string[]
}

type CategoryParamsProps = {
  data: ListResponseModel<ArticleModel[]>
  categoryData: CategoryModel
} & PageProps

const CategoryParams: NextPage<CategoryParamsProps> = ({
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
  const _params = params?.params

  if (!_params || _params?.length <= 0) {
    return {
      notFound: true,
    }
  }

  const categoryGuid = _params[0]
  const page = _params[1]

  const categoryData = await CategoryService.getItemByGuid(categoryGuid)

  const articleData = (await ArticleService.getItems({
    category: categoryData._id,
    page: Number(page),
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

  let categoryGuidTotalPages = []

  for await (const category of categories) {
    const articlePaging = (await ArticleService.getItems({
      category: category._id,
      paging: 1,
      page: 1,
      pageSize: PAGE_SIZE,
    })) as ListResponseModel<ArticleModel[]>

    categoryGuidTotalPages.push({
      guid: category.guid,
      totalPages: articlePaging.totalPages,
    })
  }
  const paths: {
    params: {
      params: string[]
    }
  }[] = []

  for (const category of categoryGuidTotalPages) {
    if (category.totalPages <= 1) continue
    ;[...Array(category.totalPages)].forEach((_, i) => {
      paths.push({
        params: { params: [category.guid, String(i + 1)] },
      })
    })
  }

  return { paths, fallback: false }
}
export default CategoryParams
