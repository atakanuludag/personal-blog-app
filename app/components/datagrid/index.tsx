// ** react
import { Dispatch, SetStateAction, useCallback, useState } from 'react'

// ** mui
import Paper from '@mui/material/Paper'
import {
  DataGrid,
  DataGridProps,
  GridColDef,
  trTR,
  GridSortModel,
  GridSelectionModel,
  GridSlotsComponentsProps,
} from '@mui/x-data-grid'
import type { GridSortDirection } from '@mui/x-data-grid'

// ** components
import Toolbar, { MuiToolbarProps } from '@/components/datagrid/Toolbar'

// ** models
import ListQueryModel from '@/models/ListQueryModel'

type MuiDataGridProps = {
  queryName: string
  loading: boolean
  setCustomLoading: Dispatch<SetStateAction<boolean>>
  deleteService: (id: string) => Promise<void>
  page?: number
  pageSize?: number
  totalResults?: number
  rows: any[]
  columns: GridColDef[]
  params?: ListQueryModel
  setParams?: Dispatch<SetStateAction<ListQueryModel>>
} & DataGridProps

export type MuiGridComponentsProps = {
  toolbar: MuiToolbarProps
} & GridSlotsComponentsProps

export default function MuiDataGrid({
  queryName,
  loading,
  setCustomLoading,
  deleteService,
  page,
  pageSize,
  totalResults,
  rows = [],
  columns,
  params,
  setParams,
  ...props
}: MuiDataGridProps) {
  const [selected, setSelected] = useState(new Array<string>())

  const orderTypeConvert = (type: GridSortDirection) => {
    switch (type) {
      case 'asc':
        return -1
      case 'desc':
        return 1
    }
  }

  const handleSortModelChange = useCallback(
    (sortModel: GridSortModel) => {
      if (!setParams) return
      if (sortModel.length <= 0) {
        setParams({
          ...params,
          order: '',
          orderBy: null,
        })
        return
      }
      const sortItem = sortModel[0]
      setParams({
        ...params,
        order: sortItem.field,
        orderBy: orderTypeConvert(sortItem.sort),
      })
    },
    [params, setParams],
  )

  const handlePageChange = (page: number) => {
    if (!setParams) return
    setParams({
      ...params,
      page: page + 1,
    })
  }

  const handlePageSizeChange = (pageSize: number) => {
    if (!setParams) return
    setParams({
      ...params,
      pageSize,
    })
  }

  const onSelectionModelChange = (ids: GridSelectionModel) =>
    setSelected(ids as any)

  const tableComponentsProps: MuiGridComponentsProps = {
    toolbar: {
      queryName,
      loading,
      setLoading: setCustomLoading,
      selected,
      deleteService,
    },
  }

  return (
    <Paper sx={{ width: '100%', height: '80vh', p: 2 }} elevation={3}>
      <DataGrid
        {...props}
        checkboxSelection
        pagination
        disableColumnFilter
        disableSelectionOnClick
        loading={loading}
        pageSize={pageSize}
        page={page ? page - 1 : undefined}
        paginationMode="server"
        sortingMode="server"
        onSortModelChange={handleSortModelChange}
        rowsPerPageOptions={[2, 10, 20, 30]}
        getRowId={(data) => data._id}
        onSelectionModelChange={onSelectionModelChange}
        rows={rows}
        columns={columns}
        rowCount={totalResults || 0}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
        componentsProps={tableComponentsProps}
        components={{
          Toolbar,
        }}
      />
    </Paper>
  )
}
