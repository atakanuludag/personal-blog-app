import React from 'react'
import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import useStoreArticle from '@/hooks/useStoreArticle'
import useArticleQuery from '@/hooks/queries/useArticleQuery'

interface IPaginationProps {}

export default function Pagination({}: IPaginationProps) {
  const { articleParamsStore, setArticleParamsStore } = useStoreArticle()
  const { articleQuery } = useArticleQuery(articleParamsStore)
  const article = articleQuery()

  const handleNextPage = () => {
    const nextPageNumber = articleParamsStore.page + 1
    setArticleParamsStore({
      ...articleParamsStore,
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
