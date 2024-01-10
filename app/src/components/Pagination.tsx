"use client";

// ** react
import { Dispatch, Fragment, SetStateAction } from "react";

// ** next
import { default as NextLink } from "next/link";

// ** mui
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

// ** models
import ListQueryModel from "@/models/ListQueryModel";

type PaginationComponentProps = {
  routerUrl?: string;
  type?: "normal" | "function";
  totalPages?: number;
  currentPage?: number;
  params?: ListQueryModel;
  setParams?: Dispatch<SetStateAction<ListQueryModel>>;
  loading?: boolean;
};

export default function PaginationComponent({
  routerUrl,
  type = "normal",
  totalPages = 1,
  currentPage = 1,
  params,
  setParams,
  loading = false,
}: PaginationComponentProps) {
  const getPaginationUrl = (page: number | null) => `/${routerUrl}/${page}`;

  const handleServerSideClickPage = (page?: number) => {
    if (!setParams || !params) return;

    const nextPageNumber = page ? page : params?.page ? params.page + 1 : 1;

    setParams({
      ...params,
      page: nextPageNumber,
    });
  };

  if (!totalPages || !currentPage) return <Fragment />;

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      {type === "normal" && (
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

      {type === "function" && (
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(e, page) => handleServerSideClickPage(page)}
          disabled={loading}
        />
      )}
    </Box>
  );
}
