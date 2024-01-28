"use client";

// ** react
import { useState } from "react";

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
import CategoryService from "@/services/CategoryService";

// ** models
import CategoryModel, { CategoryFormModel } from "@/models/CategoryModel";
import ListQueryModel from "@/models/ListQueryModel";
import ListResponseModel from "@/models/ListResponseModel";

// ** hooks
import useCategoryQuery from "@/hooks/queries/useCategoryQuery";
import useComponentContext from "@/hooks/useComponentContext";

// ** components
import DataGrid from "@/components/datagrid";
import SearchInput from "@/components/admin/shared/SearchInput";
import NewEditCategory from "@/components/admin/categories/NewEditCategory";

// ** config
import { PAGE_SIZE, QUERY_NAMES } from "@/config";

export default function AdminCategories() {
  const [params, setParams] = useState<ListQueryModel>({
    page: 1,
    pageSize: PAGE_SIZE,
  });

  const [customLoading, setCustomLoading] = useState(false);

  const { useCategoriesQuery } = useCategoryQuery(params);
  const { setFormDrawerData } = useComponentContext();

  const { data, isLoading, isFetching } = useCategoriesQuery();
  const items = data?.data as ListResponseModel<CategoryModel[]>;
  const loading = isLoading || isFetching || customLoading;

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Başlık",
      width: 250,
      renderCell: ({ row }: GridRenderCellParams<any, CategoryModel, any>) => (
        <Link onClick={() => handleEditButton(row)} component="button">
          {row.title}
        </Link>
      ),
    },
    {
      field: "parent",
      headerName: "Evebeyn",
      width: 180,
      renderCell: ({ row }: GridRenderCellParams<any, CategoryModel, any>) =>
        row.parent?.title || "-",
    },
    {
      field: "guid",
      headerName: "Link",
      width: 200,
    },
    {
      field: "order",
      headerName: "Sıra",
      width: 100,
    },
    {
      field: "createdAt",
      headerName: "Oluşturma Tarihi",
      width: 200,
      renderCell: ({ row }: GridRenderCellParams<CategoryModel>) =>
        format(new Date(row.createdAt), "PP - p"),
    },
    {
      field: "updatedAt",
      headerName: "Güncelleme Tarihi",
      width: 200,
      renderCell: ({ row }: GridRenderCellParams<CategoryModel>) =>
        format(new Date(row.updatedAt), "PP - p"),
    },
  ];

  const handleEditButton = (row: CategoryModel) =>
    handleToggleNewEditButton(row);

  const handleToggleNewEditButton = (data?: CategoryFormModel) =>
    setFormDrawerData({
      open: true,
      title: data?._id ? "Kategori Düzenle" : "Yeni Kategori",
      content: <NewEditCategory data={data} />,
      submitButtonText: "Kaydet",
      submit: false,
      submitDisabled: true,
    });

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
              Kategoriler
            </Typography>
            <Button
              variant="contained"
              size="small"
              onClick={() => handleToggleNewEditButton()}
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
        queryName={QUERY_NAMES.CATEGORY}
        loading={loading}
        setCustomLoading={setCustomLoading}
        deleteService={CategoryService.deleteItem}
        columns={columns}
        rows={items?.results || []}
        pageSize={params.pageSize as number}
        page={params.page as number}
        totalResults={items?.totalResults as number}
        params={params}
        setParams={setParams}
        deleteDialogMessage="Seçtiğiniz kategorilere bağlı makaleler olabilir. Gerçekten silmek istiyor musunuz ?"
      />
    </Box>
  );
}
