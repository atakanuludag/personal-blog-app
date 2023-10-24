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

// ** utils
import {
  getLatestParam,
  getPageParam,
  getUrlByRemovePageParam,
  isPagingParams,
} from '@/utils/ParamsOperation'

// Todo: category ve tags gibi sayfalarda next-seo ayarları yapılacak.

type StaticPathParams = {
  guid: string[]
}

type CategoryGuidProps = {
  guid: string[]
  data: ListResponseModel<ArticleModel[]>
  categoryData: CategoryModel
} & PageProps

const CategoryGuid: NextPage<CategoryGuidProps> = ({
  guid,
  data,
  categoryData,
}: CategoryGuidProps) => {
  console.log(guid)
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
          routerUrl={`category/${guid.join('/')}/page`}
          totalPages={data.totalPages}
          currentPage={data.currentPage}
        />
      </Box>
    </Fragment>
  )
}

const generateGuidUrls = (
  data: CategoryModel[],
  parent: string,
  guid: string,
  arr: string[],
): string[] => {
  const find = data.find((p) => p._id === parent)
  if (!find) {
    arr.push(guid)
    return arr
  }

  arr.unshift(find.guid)

  return generateGuidUrls(data, find.parent?._id as string, guid, arr)
}

export const getStaticProps: GetStaticProps<any, StaticPathParams> = async ({
  params,
}) => {
  if (!params?.guid) {
    return {
      notFound: true,
    }
  }

  const isPaging = isPagingParams(params?.guid)
  const latestGuid = getLatestParam(isPaging, params.guid)
  const categoryData = await CategoryService.getItemByGuid(latestGuid)

  const articleData = (await ArticleService.getItems({
    category: categoryData._id,
    page: getPageParam(isPaging, params?.guid),
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
      guid: getUrlByRemovePageParam(isPaging, params?.guid),
    },
    revalidate: REVALIDATE_SECONDS,
  }
}

export const getStaticPaths: GetStaticPaths<StaticPathParams> = async () => {
  const categories = (await CategoryService.getItems({
    paging: 0,
  })) as CategoryModel[]

  let paths: {
    params: StaticPathParams
  }[] = []

  for await (const item of categories) {
    const guidUrls = generateGuidUrls(
      categories,
      item.parent?._id as string,
      item.guid,
      [],
    )

    const articlePaging = (await ArticleService.getItems({
      category: item._id,
      paging: 1,
      page: 1,
      pageSize: PAGE_SIZE,
    })) as ListResponseModel<ArticleModel[]>

    paths.push({
      params: {
        guid: guidUrls,
      },
    })

    if (articlePaging.totalPages > 1) {
      ;[...Array(articlePaging.totalPages)].forEach((_, i) => {
        //String(i + 1)
        paths.push({
          params: { guid: [...guidUrls, 'page', String(i + 1)] },
        })
      })
    }
  }

  //const isPaging = paths.some((p) => p.params.guid.includes('page'))

  paths = paths.filter(
    (item) =>
      item.params.guid.length > (item.params.guid.includes('page') ? 3 : 1),
  )

  return {
    paths,
    fallback: false,
  }
}
export default CategoryGuid
