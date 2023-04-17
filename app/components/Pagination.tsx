// ** react
import { ChangeEvent, Dispatch, Fragment, SetStateAction } from 'react'

// ** next
import { useRouter } from 'next/router'

// ** mui
import Box from '@mui/material/Box'
import Pagination from '@mui/material/Pagination'
import LoadingButton from '@mui/lab/LoadingButton'

// ** models
import ListQueryModel from '@/models/ListQueryModel'
import { FetchNextPageOptions, InfiniteQueryObserverResult } from 'react-query'
import ListResponseModel from '@/models/ListResponseModel'

type RouterQueryProps = {
  path: string
  query: string
}

type PaginationComponentProps = {
  type?: 'moreButton' | 'normal'
  totalPages?: number
  currentPage?: number
  routerQuery?: RouterQueryProps[]
  params?: ListQueryModel
  setParams?: Dispatch<SetStateAction<ListQueryModel>>
  fetchNextPage?: (
    options?: FetchNextPageOptions | undefined,
  ) => Promise<InfiniteQueryObserverResult<any>>
  loading?: boolean
}

export default function PaginationComponent({
  type = 'normal',
  totalPages = 1,
  currentPage = 1,
  routerQuery,

  params,
  setParams,
  fetchNextPage,
  loading = false,
}: PaginationComponentProps) {
  const router = useRouter()

  const handlePaginationClick = (e: ChangeEvent<unknown>, page: number) => {
    if (!routerQuery) return

    let query: any = {}

    routerQuery.forEach((q) => {
      query[q.path] = q.query
    })

    const generatePathName = routerQuery.map((r) => `[${r.path}]`).join('/')
    router.push({
      pathname: `/${generatePathName}/[page]`,
      query: { ...query, page },
    })
  }

  const handleMoreButtonNextPage = () => {
    if (!setParams || !params || !fetchNextPage) return

    const nextPageNumber = params?.page ? params.page + 1 : 1
    setParams({
      ...params,
      page: nextPageNumber,
    })
    fetchNextPage({
      pageParam: nextPageNumber,
    })
  }

  if (!totalPages || !currentPage) return <Fragment />

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
          count={totalPages}
          page={currentPage}
          onChange={handlePaginationClick}
          disabled={loading}
        />
      )}
    </Box>
  )
}
