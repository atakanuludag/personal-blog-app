import React from 'react'
import { GetServerSideProps, NextPage } from 'next/types'
import { useRouter } from 'next/router'
import { dehydrate } from 'react-query'
import Box from '@mui/material/Box'
import useArticleQuery from '@/hooks/queries/useArticleQuery'
import useStoreArticle from '@/hooks/useStoreArticle'

interface IGuidProps {}

const Guid: NextPage<IGuidProps> = () => {
  const { query } = useRouter()
  const guid = !query.guid ? '' : query.guid

  const { articleParamsStore } = useStoreArticle()
  const { articleGetByGuidQuery } = useArticleQuery(articleParamsStore)
  const article = articleGetByGuidQuery(guid as string)

  if (article.isSuccess) {
    return (
      <>
        <Box component="section">
          <p>{article.data.title}</p>
        </Box>
      </>
    )
  }

  return <></>
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const guid = !query.guid ? '' : query.guid

  const { queryClient, articleByGuidPreFetchQuery } = useArticleQuery()
  await articleByGuidPreFetchQuery(guid as string)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default Guid
