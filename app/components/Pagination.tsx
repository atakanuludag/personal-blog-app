import React from 'react'
import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import useArticleQuery from '@/hooks/queries/useArticleQuery'
import IListQuery from '@/models/IListQuery'

interface IPaginationProps {
  params: IListQuery
  setParams: React.Dispatch<React.SetStateAction<IListQuery>>
}

export default function Pagination({ params, setParams }: IPaginationProps) {
  const { articleInfiniteQuery } = useArticleQuery(params)
  const article = articleInfiniteQuery()

  const handleNextPage = () => {
    const nextPageNumber = params.page + 1
    setParams({
      ...params,
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
        fullWidth
      >
        Daha fazla
      </LoadingButton>
    </Box>
  )
}
