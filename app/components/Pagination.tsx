import React from 'react'
import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import useStoreArticle from '@/hooks/useStoreArticle'
import useArticleQuery from '@/hooks/queries/useArticleQuery'

interface IPaginationProps {}

export default function Pagination({}: IPaginationProps) {
  const { articleParams, setArticleParams } = useStoreArticle()
  const { articleQuery } = useArticleQuery(articleParams)
  const article = articleQuery()

  const handleNextPage = () => {
    const nextPageNumber = articleParams.page + 1
    setArticleParams({
      ...articleParams,
      page: nextPageNumber,
    })
    article.fetchNextPage({
      pageParam: nextPageNumber,
    })
  }
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <LoadingButton
        loading={
          article.isLoading || article.isFetching || article.isFetchingNextPage
        }
        variant="contained"
        size="large"
        onClick={handleNextPage}
        sx={{
          width: '20%',
        }}
      >
        Daha fazla
      </LoadingButton>
    </Box>
  )
}
