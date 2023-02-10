// ** react
import { Dispatch, SetStateAction } from 'react'

// ** next
import { useRouter } from 'next/router'

// ** mui
import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'

// ** hooks
import useArticleQuery from '@/hooks/queries/useArticleQuery'

// ** models
import IListQuery from '@/models/IListQuery'

interface IPaginationProps {
  params: IListQuery
  setParams: Dispatch<SetStateAction<IListQuery>>
}

export default function Pagination({ params, setParams }: IPaginationProps) {
  const router = useRouter()
  const { articleInfiniteQuery } = useArticleQuery(params)
  const article = articleInfiniteQuery()

  const handleNextPage = () => {
    const nextPageNumber = params?.page ? params.page + 1 : 1
    setParams({
      ...params,
      page: nextPageNumber,
    })
    article.fetchNextPage({
      pageParam: nextPageNumber,
    })
    //`/page/${nextPageNumber}`
    //router.replace(`/page/${nextPageNumber}`, undefined)
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
