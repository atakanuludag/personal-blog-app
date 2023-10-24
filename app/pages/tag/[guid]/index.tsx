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
import TagService from '@/services/TagService'

// ** components
import ArticleItem from '@/components/ArticleItem'
import Pagination from '@/components/Pagination'

// ** models
import PageProps from '@/models/AppPropsModel'
import ArticleModel from '@/models/ArticleModel'
import ListResponseModel from '@/models/ListResponseModel'
import TagModel from '@/models/TagModel'

// ** config
import { PAGE_SIZE, REVALIDATE_SECONDS } from '@/config'

type StaticPathParams = {
  guid: string
}

type TagGuidProps = {
  guid: string
  data: ListResponseModel<ArticleModel[]>
  tagData: TagModel
} & PageProps

const TagGuid: NextPage<TagGuidProps> = ({
  guid,
  data,
  tagData,
}: TagGuidProps) => {
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
        >{`Etiket: ${tagData.title}`}</Typography>
      </Paper>
      <Box component="section">
        {data.results.map((item) => (
          <ArticleItem key={item._id} data={item} />
        ))}
      </Box>

      <Box component="section">
        <Pagination
          routerUrl={`tag/${guid}/page`}
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
  if (!params?.guid) {
    return {
      notFound: true,
    }
  }

  const tagData = await TagService.getItemByGuid(params?.guid)

  const articleData = (await ArticleService.getItems({
    tag: tagData._id,
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
      guid: params?.guid,
      data: articleData,
      tagData,
    },
    revalidate: REVALIDATE_SECONDS,
  }
}

export const getStaticPaths: GetStaticPaths<StaticPathParams> = async () => {
  const tags = (await TagService.getItems({
    paging: 0,
  })) as TagModel[]

  const paths = tags.map((item) => ({
    params: { guid: item.guid },
  }))

  return { paths, fallback: false }
}
export default TagGuid
