"use client";

// ** react
import { Dispatch, SetStateAction, useCallback, useState } from "react";

// ** mui
import Paper from "@mui/material/Paper";
import {
  DataGrid,
  DataGridProps,
  GridColDef,
  GridSortModel,
  GridRowSelectionModel,
  GridSlotsComponentsProps,
} from "@mui/x-data-grid";
import { trTR } from "@mui/x-data-grid/locales";
import type {
  GridPaginationModel,
  GridSlots,
  GridSortDirection,
} from "@mui/x-data-grid";

// ** components
import Toolbar, { MuiToolbarProps } from "@/components/datagrid/Toolbar";

// ** models
import ListQueryModel from "@/models/ListQueryModel";

type MuiDataGridProps = {
  queryName: string;
  loading: boolean;
  setCustomLoading: Dispatch<SetStateAction<boolean>>;
  deleteService: (id: string) => Promise<unknown>;
  page?: number;
  pageSize?: number;
  totalResults?: number;
  rows: any[];
  columns: GridColDef[];
  params?: ListQueryModel;
  setParams?: Dispatch<SetStateAction<ListQueryModel>>;
  deleteDialogMessage?: string;
} & DataGridProps;

export type MuiGridComponentsProps = {
  toolbar: MuiToolbarProps;
} & GridSlotsComponentsProps;

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
  deleteDialogMessage,
  ...props
}: MuiDataGridProps) {
  const [selected, setSelected] = useState(new Array<string>());

  const orderTypeConvert = (type: GridSortDirection): number => {
    switch (type) {
      case "asc":
        return -1;
      case "desc":
        return 1;
      default:
        return -1;
    }
  };

  const handleSortModelChange = useCallback(
    (sortModel: GridSortModel) => {
      if (!setParams) return;
      if (sortModel.length <= 0) {
        setParams({
          ...params,
          order: "",
          orderBy: null,
        });
        return;
      }
      const sortItem = sortModel[0];
      setParams({
        ...params,
        order: sortItem.field,
        orderBy: orderTypeConvert(sortItem.sort),
      });
    },
    [params, setParams]
  );

  const handlePageChange = (model: GridPaginationModel) => {
    if (!setParams) return;
    setParams({
      ...params,
      page: model.page + 1,
      pageSize: model.pageSize,
    });
  };

  const onRowSelectionModelChange = (ids: GridRowSelectionModel) =>
    setSelected(ids as string[]);

  const tableComponentsProps: MuiGridComponentsProps = {
    toolbar: {
      queryName,
      loading,
      setLoading: setCustomLoading,
      selected,
      deleteService,
      deleteDialogMessage,
    },
  };

  return (
    <Paper sx={{ width: "100%", height: "80vh", p: 2 }} elevation={3}>
      <DataGrid
        {...props}
        checkboxSelection
        pagination
        disableColumnFilter
        disableRowSelectionOnClick
        loading={loading}
        paginationModel={{
          page: page ? page - 1 : 0,
          pageSize: pageSize || 0,
        }}
        paginationMode="server"
        sortingMode="server"
        onSortModelChange={handleSortModelChange}
        pageSizeOptions={[2, 10, 20, 30]}
        getRowId={(data) => data._id}
        onRowSelectionModelChange={onRowSelectionModelChange}
        onPaginationModelChange={handlePageChange}
        rows={rows}
        columns={columns}
        rowCount={totalResults || 0}
        // onPageSizeChange={handlePageSizeChange}
        localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
        slotProps={tableComponentsProps}
        slots={{
          toolbar: Toolbar as GridSlots["toolbar"],
        }}
        // componentsProps={tableComponentsProps}
        // components={{
        //   Toolbar,
        // }}
      />
    </Paper>
  );
}
