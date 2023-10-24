// ** react
import { ChangeEvent, Dispatch, Fragment, SetStateAction } from 'react'

// ** next
import { useRouter } from 'next/router'
import { default as NextLink } from 'next/link'

// ** third party
import { FetchNextPageOptions, InfiniteQueryObserverResult } from 'react-query'

// ** mui
import Box from '@mui/material/Box'
import Pagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'
import LoadingButton from '@mui/lab/LoadingButton'

// ** models
import ListQueryModel from '@/models/ListQueryModel'

type PaginationComponentProps = {
  routerUrl?: string
  type?: 'moreButtonServerSide' | 'normal' | 'normalServerSide'
  totalPages?: number
  currentPage?: number
  params?: ListQueryModel
  setParams?: Dispatch<SetStateAction<ListQueryModel>>
  fetchNextPage?: (
    options?: FetchNextPageOptions | undefined,
  ) => Promise<InfiniteQueryObserverResult<any>>
  loading?: boolean
}

export default function PaginationComponent({
  routerUrl,
  type = 'normal',
  totalPages = 1,
  currentPage = 1,
  params,
  setParams,
  fetchNextPage,
  loading = false,
}: PaginationComponentProps) {
  const router = useRouter()

  const getPaginationUrl = (page: number | null) => `/${routerUrl}/${page}`

  const handleServerSideClickPage = (page?: number) => {
    if (!setParams || !params) return

    const nextPageNumber = page ? page : params?.page ? params.page + 1 : 1

    setParams({
      ...params,
      page: nextPageNumber,
    })
    if (fetchNextPage)
      fetchNextPage({
        pageParam: nextPageNumber,
      })
  }

  if (!totalPages || !currentPage) return <Fragment />

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      {type === 'moreButtonServerSide' && (
        <LoadingButton
          loading={loading}
          variant="contained"
          size="large"
          onClick={() => handleServerSideClickPage()}
          fullWidth
        >
          Daha fazla
        </LoadingButton>
      )}

      {type === 'normal' && (
        <Pagination
          renderItem={(item) => (
            <NextLink href={getPaginationUrl(item.page)}>
              <PaginationItem {...item} />
            </NextLink>
          )}
          count={totalPages}
          page={currentPage}
          disabled={loading}
        />
      )}

      {type === 'normalServerSide' && (
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(e, page) => handleServerSideClickPage(page)}
          disabled={loading}
        />
      )}
    </Box>
  )
}
