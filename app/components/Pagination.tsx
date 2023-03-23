// ** react
import { ChangeEvent, Dispatch, SetStateAction } from 'react'

// ** next
import { useRouter } from 'next/router'

// ** mui
import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import Pagination from '@mui/material/Pagination'

// ** hooks
import useArticleQuery from '@/hooks/queries/useArticleQuery'

// ** models
import ListQueryModel from '@/models/ListQueryModel'

type PaginationComponentProps = {
  params: ListQueryModel
  setParams: Dispatch<SetStateAction<ListQueryModel>>
  type?: 'moreButton' | 'pagination'
  totalPages?: number
}

export default function PaginationComponent({
  params,
  setParams,
  type = 'moreButton',
  totalPages = 1,
}: PaginationComponentProps) {
  const router = useRouter()
  const { articleInfiniteQuery } = useArticleQuery(params)
  const article = articleInfiniteQuery()
  const loading =
    article.isLoading || article.isFetching || article.isFetchingNextPage

  const handleMoreButtonNextPage = () => {
    const nextPageNumber = params?.page ? params.page + 1 : 1
    setParams({
      ...params,
      page: nextPageNumber,
    })
    article.fetchNextPage({
      pageParam: nextPageNumber,
    })
  }

  const handlePaginationClick = (e: ChangeEvent<unknown>, page: number) => {
    setParams({
      ...params,
      page,
    })
    router.replace(`/page/${page}`, undefined)
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      {type === 'moreButton' ? (
        <LoadingButton
          loading={loading}
          variant="contained"
          size="large"
          onClick={handleMoreButtonNextPage}
          fullWidth
        >
          Daha fazla
        </LoadingButton>
      ) : (
        <Pagination
          disabled={loading}
          count={totalPages}
          page={params?.page || 1}
          onChange={handlePaginationClick}
        />
      )}
    </Box>
  )
}
