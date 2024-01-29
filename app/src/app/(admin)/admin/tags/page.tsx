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
import TagService from "@/services/TagService";

// ** models'
import TagModel from "@/models/TagModel";
import ListQueryModel from "@/models/ListQueryModel";
import ListResponseModel from "@/models/ListResponseModel";

// ** hooks
import useTagQuery from "@/hooks/queries/useTagQuery";
import useComponentContext from "@/hooks/useComponentContext";

// ** components
import DataGrid from "@/components/datagrid";
import AdminSearchInput from "@/components/admin/shared/SearchInput";
import NewEditTag from "@/components/admin/tags/NewEditTag";

// ** config
import { PAGE_SIZE, QUERY_NAMES } from "@/config";

export default function AdminTags() {
  const [params, setParams] = useState<ListQueryModel>({
    page: 1,
    pageSize: PAGE_SIZE,
  });

  const [customLoading, setCustomLoading] = useState(false);

  const { useTagItemsQuery } = useTagQuery(params);
  const { setFormDrawerData } = useComponentContext();

  const { data, isLoading, isFetching } = useTagItemsQuery();
  const items = data?.data as ListResponseModel<TagModel[]>;
  const loading = isLoading || isFetching || customLoading;

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Başlık",
      flex: 1,
      renderCell: ({ row }: GridRenderCellParams<any, TagModel, any>) => (
        <Link onClick={() => handleEditButton(row)} component="button">
          {row.title}
        </Link>
      ),
    },
    {
      field: "guid",
      headerName: "Link",
      width: 200,
    },
    {
      field: "updatedAt",
      headerName: "Güncelleme Tarihi",
      width: 200,
      renderCell: ({ row }: GridRenderCellParams<TagModel>) =>
        format(new Date(row.updatedAt), "PP - p"),
    },
  ];

  const handleEditButton = (row: TagModel) => handleToggleNewEditButton(row);

  const handleToggleNewEditButton = (data?: TagModel) =>
    setFormDrawerData({
      open: true,
      title: data?._id ? "Etiket Düzenle" : "Yeni Etiket",
      content: <NewEditTag data={data} />,
      submitButtonText: "Kaydet",
      submit: false,
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
              Etiketler
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
          <AdminSearchInput
            loading={loading}
            params={params}
            setParams={setParams}
          />
        </Grid>
      </Grid>

      <DataGrid
        queryName={QUERY_NAMES.TAG}
        loading={loading}
        setCustomLoading={setCustomLoading}
        deleteService={TagService.deleteItem}
        columns={columns}
        rows={items?.results || []}
        pageSize={params.pageSize as number}
        page={params.page as number}
        totalResults={items?.totalResults as number}
        params={params}
        setParams={setParams}
        deleteDialogMessage="Seçtiğiniz etiketlere bağlı makaleler olabilir. Gerçekten silmek istiyor musunuz ?"
      />
    </Box>
  );
}
