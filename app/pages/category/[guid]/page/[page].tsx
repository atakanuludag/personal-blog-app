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
import ArticleModel from '@/models/ArticleModel'
import ListResponseModel from '@/models/ListResponseModel'
import CategoryModel from '@/models/CategoryModel'

// ** config
import { PAGE_SIZE, REVALIDATE_SECONDS } from '@/config'

type StaticPathParams = {
  guid: string
  page: string
}

type CategoryPageProps = {
  guid: string
  data: ListResponseModel<ArticleModel[]>
  categoryData: CategoryModel
} & PageProps

const CategoryPage: NextPage<CategoryPageProps> = ({
  guid,
  data,
  categoryData,
}: CategoryPageProps) => {
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
        {categoryData?.description && (
          <Typography component="p" variant="caption" color="gray">
            {categoryData.description}
          </Typography>
        )}
      </Paper>
      <Box component="section">
        {data.results.map((item) => (
          <ArticleItem key={item._id} data={item} />
        ))}
      </Box>

      <Box component="section">
        <Pagination
          routerUrl={`category/${guid}/page`}
          totalPages={data.totalPages}
          currentPage={data.currentPage}
        />
      </Box>
    </Fragment>
  )
}

export const getStaticProps: GetStaticProps<any, StaticPathParams> = async ({
  params,
}) => {
  if (!params) {
    return {
      notFound: true,
    }
  }

  const { guid, page } = params

  const categoryData = await CategoryService.getItemByGuid(guid)

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
      guid,
      data: articleData,
      categoryData,
    },
    revalidate: REVALIDATE_SECONDS,
  }
}

export const getStaticPaths: GetStaticPaths<StaticPathParams> = async () => {
  const categories = (await CategoryService.getItems({
    paging: 0,
    sType: 'parent',
    s: 'null',
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
    params: StaticPathParams
  }[] = []

  for (const category of categoryGuidTotalPages) {
    if (category.totalPages <= 1) continue
    ;[...Array(category.totalPages)].forEach((_, i) => {
      paths.push({
        params: { guid: category.guid, page: String(i + 1) },
      })
    })
  }

  return { paths, fallback: false }
}
export default CategoryPage
