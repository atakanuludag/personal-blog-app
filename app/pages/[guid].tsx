import React from 'react'
import { GetServerSideProps, NextPage } from 'next/types'
import { useRouter } from 'next/router'
import { dehydrate, QueryClient } from 'react-query'
import Box from '@mui/material/Box'
import useArticleQuery from '@/hooks/queries/useArticleQuery'
import useStoreArticle from '@/hooks/useStoreArticle'

interface IGuidProps {}

const Guid: NextPage<IGuidProps> = (props: any) => {
  console.log('props guid page', props)

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
  const queryClient = new QueryClient()

  const { articleByGuidPreFetchQuery } = useArticleQuery()
  await articleByGuidPreFetchQuery(queryClient, guid as string)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default Guid
