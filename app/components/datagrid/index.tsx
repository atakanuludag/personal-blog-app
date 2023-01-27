import React, { useEffect, useState } from 'react'
import { alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import DeleteIcon from '@mui/icons-material/Delete'
import FilterListIcon from '@mui/icons-material/FilterList'

import {
  GridColDef,
  GridColumnMenu,
  GridColumnMenuContainer,
  GridColumnMenuProps,
  GridFilterMenuItem,
  GridRowsProp,
  SortGridMenuItems,
  useGridApiRef,
} from '@mui/x-data-grid'

import { getComparator, stableSort } from './utils'

import { OrderType } from '@/models/enums'

import { DataGrid } from '@mui/x-data-grid'

// interface DataGridRowsProp<T> extends GridRowsProp {

// }

interface IMuiDataGridProps {
  loading: boolean
  page: number
  pageSize: number
  totalResults: number
  data: GridRowsProp[]
  columns: GridColDef[]
  handlePageChange: (page: number) => void
  handlePageSizeChange: (pageSize: number) => void
}

export default function MuiDataGrid({
  loading,
  page,
  pageSize,
  totalResults,
  data = [],
  columns,
  handlePageChange,
  handlePageSizeChange,
}: IMuiDataGridProps) {
  const [order, setOrder] = useState<OrderType>(OrderType.ASC)
  const [orderBy, setOrderBy] = useState('test') //todo
  const [selected, setSelected] = useState<string[]>([])
  //console.log('selected', selected)
  //const [page, setPage] = useState(0)
  const [dense, setDense] = useState(false)
  //const [rowsPerPage, setRowsPerPage] = useState(10)
  useEffect(() => {}, [])

  const handleRequestSort = (event: any, property: any) => {
    const isAsc = orderBy === property && order === OrderType.ASC
    setOrder(isAsc ? OrderType.DESC : OrderType.ASC)
    setOrderBy(property)
  }

  const handleSelectAllClick = (event: any) => {
    // if (event.target.checked) {
    //   const newSelecteds = rows.map((n) => n.id)
    //   setSelected(newSelecteds)
    //   return
    // }
    // setSelected([])
  }

  // const handleClick = (event: any, id: string) => {
  //   const selectedIndex = selected.indexOf(id)
  //   let newSelected: any = []

  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, id)
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1))
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1))
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1),
  //     )
  //   }

  //   setSelected(newSelected)
  // }

  // const handleChangePage = (event: any, newPage: any) => {
  //   //setPage(newPage)
  // }

  const handleChangeRowsPerPage = (event: any) => {
    //setRowsPerPage(parseInt(event.target.value, 10))
    //setPage(0)
  }

  const handleChangeDense = (event: any) => {
    setDense(event.target.checked)
  }

  const isSelected = (id: string) => selected.indexOf(id) !== -1

  // Avoid a layout jump when reaching the last page with empty rows.
  // const emptyRows =
  //   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  return (
    <Box sx={{ width: '100%', height: '80%' }}>
      <Paper sx={{ width: '100%', height: '100%', p: 3, pt: 1 }} elevation={10}>
        <DataGrid
          pagination
          disableSelectionOnClick
          pageSize={pageSize}
          page={page - 1}
          paginationMode="server"
          rowsPerPageOptions={[2, 10, 20, 30]}
          getRowId={(data) => data.id}
          // onSelectionModelChange={(ids) => onSelectionModelChange(ids)}
          loading={loading}
          //checkboxSelection
          rows={data}
          columns={columns}
          rowCount={totalResults || 0}
          onPageChange={(page) => handlePageChange(page + 1)}
          onPageSizeChange={handlePageSizeChange}

          // componentsProps={tableComponentsProps}
          // components={{
          //   Toolbar: CustomToolbar,
          //   Pagination: CustomPagination
          // }}
        />
      </Paper>
    </Box>
  )
}
