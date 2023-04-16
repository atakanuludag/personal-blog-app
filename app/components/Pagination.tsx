// ** react
import { ChangeEvent, Fragment } from 'react'

// ** next
import { useRouter } from 'next/router'

// ** mui
import Box from '@mui/material/Box'
import Pagination from '@mui/material/Pagination'

type RouterQueryProps = {
  path: string
  query: string
}

type PaginationComponentProps = {
  totalPages: number
  currentPage: number
  routerQuery: RouterQueryProps[]
}

export default function PaginationComponent({
  totalPages = 1,
  currentPage = 1,
  routerQuery,
}: PaginationComponentProps) {
  const router = useRouter()

  const handlePaginationClick = (e: ChangeEvent<unknown>, page: number) => {
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
  if (!totalPages || !currentPage) return <Fragment />

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePaginationClick}
      />
    </Box>
  )
}
