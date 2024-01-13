"use client";

// ** react
import React, { useState } from "react";

// ** next
import { default as NextLink } from "next/link";

// ** mui
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid/models";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

// ** third party
import { format } from "date-fns";

// ** services
import ArticleService from "@/services/ArticleService";

// ** models
import ArticleModel from "@/models/ArticleModel";
import ListQueryModel from "@/models/ListQueryModel";
import ListResponseModel from "@/models/ListResponseModel";
import { OrderType } from "@/models/enums";

// ** hooks
import useArticleQuery from "@/hooks/queries/useArticleQuery";

// ** components
import DataGrid from "@/components/datagrid";
import SearchInput from "@/components/admin/shared/SearchInput";

// ** config
import { PAGE_SIZE, QUERY_NAMES } from "@/config";

export default function AdminArticleIndex() {
  const [params, setParams] = useState<ListQueryModel>({
    page: 1,
    pageSize: PAGE_SIZE,
    order: "publishingDate",
    orderBy: OrderType.ASC,
  });
  const [customLoading, setCustomLoading] = useState(false);
  const { useArticleItemsQuery } = useArticleQuery();
  const { data, isLoading, isFetching } = useArticleItemsQuery(params);
  const items = data as ListResponseModel<ArticleModel[]>;
  const loading = isLoading || isFetching || customLoading;

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Başlık",
      width: 450,
      renderCell: ({ row }: GridRenderCellParams<any, ArticleModel, any>) => (
        <Link component={NextLink} href={`/admin/articles/${row._id}`}>
          {row.title}
        </Link>
      ),
    },
    {
      field: "publishingDate",
      headerName: "Tarih",
      width: 200,
      renderCell: ({ row }: GridRenderCellParams<ArticleModel>) =>
        format(new Date(row.publishingDate), "PP - p"),
    },
    {
      field: "categories",
      headerName: "Kategoriler",
      width: 410,
      renderCell: ({ row }: GridRenderCellParams<ArticleModel>) =>
        row.categories.map((v) => v.title).join(", "),
    },
  ];

  return (
    <Box>
      <Grid
        container
        spacing={1}
        display="flex"
        justifyContent="space-between"
        pb={3}
      >
        <Grid item md={9} xs={12} display="flex" alignItems="center">
          <Stack direction="row" spacing={1}>
            <Typography variant="h5" fontWeight={500}>
              Makaleler
            </Typography>
            <Button
              variant="contained"
              size="small"
              component={NextLink}
              href="/admin/articles/new"
            >
              Yeni ekle
            </Button>
          </Stack>
        </Grid>

        <Grid item md={3} xs={12}>
          <SearchInput
            loading={loading}
            params={params}
            setParams={setParams}
          />
        </Grid>
      </Grid>

      <DataGrid
        queryName={QUERY_NAMES.ARTICLE}
        loading={loading}
        setCustomLoading={setCustomLoading}
        deleteService={ArticleService.deleteItem}
        columns={columns}
        rows={items?.results || []}
        pageSize={params.pageSize as number}
        page={params.page as number}
        totalResults={items?.totalResults as number}
        params={params}
        setParams={setParams}
      />
    </Box>
  );
}
