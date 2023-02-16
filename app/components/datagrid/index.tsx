// ** react
import { Dispatch, SetStateAction, useCallback, useState } from 'react'

// ** mui
import Paper from '@mui/material/Paper'
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  trTR,
  GridSortModel,
  GridSelectionModel,
  GridToolbarContainer,
} from '@mui/x-data-grid'
import type { GridSortDirection } from '@mui/x-data-grid'

// ** components
import Toolbar from '@/components/datagrid/Toolbar'

// ** models
import IListQuery from '@/models/IListQuery'

type MuiDataGridProps = {
  loading: boolean
  page: number
  pageSize: number
  totalResults: number
  data: GridRowsProp[]
  columns: GridColDef[]
  params: IListQuery
  setParams: Dispatch<SetStateAction<IListQuery>>
}

export default function MuiDataGrid({
  loading,
  page,
  pageSize,
  totalResults,
  data = [],
  columns,
  params,
  setParams,
}: MuiDataGridProps) {
  const [selected, setSelected] = useState(new Array<string>())
  const isSelected = selected.length > 0

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

  const handlePageChange = (page: number) =>
    setParams({
      ...params,
      page: page + 1,
    })

  const handlePageSizeChange = (pageSize: number) =>
    setParams({
      ...params,
      pageSize,
    })

  const onSelectionModelChange = (ids: GridSelectionModel) =>
    setSelected(ids as any)

  const tableComponentsProps = {
    toolbar: {
      selected,
    },
  }

  return (
    <Paper sx={{ width: '100%', height: '80vh', p: 2 }} elevation={3}>
      <DataGrid
        checkboxSelection
        pagination
        disableColumnFilter
        disableSelectionOnClick
        loading={loading}
        pageSize={pageSize}
        page={page - 1}
        paginationMode="server"
        sortingMode="server"
        onSortModelChange={handleSortModelChange}
        rowsPerPageOptions={[2, 10, 20, 30]}
        getRowId={(data) => data._id}
        onSelectionModelChange={onSelectionModelChange}
        rows={data}
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
