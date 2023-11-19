// ** react
import { Fragment } from "react";

// ** next
import { Metadata } from "next";

// ** mui
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

// ** components
import ArticleItem from "@/components/article/Item";
import Pagination from "@/components/Pagination";
import SearchInput from "@/components/SearchInput";

// ** service
import ArticleService from "@/services/ArticleService";

// ** models
import ListResponseModel from "@/models/ListResponseModel";
import ArticleModel from "@/models/ArticleModel";

// ** config
import { PAGE_SIZE } from "@/config";

type BlogSearchProps = {
  searchParams?: { [key: string]: string | string[] | undefined };
};
export default async function BlogSearch({ searchParams }: BlogSearchProps) {
  const s = searchParams?.s;

  let data = {
    totalPages: 0,
    currentPage: 0,
    currentPageSize: 0,
    hasNextPage: false,
    pageSize: 0,
    results: [],
    totalResults: 0,
  } as ListResponseModel<ArticleModel[]>;

  if (s) {
    data = (await ArticleService.getItems({
      page: 1,
      pageSize: PAGE_SIZE,
      sType: "title,shortDescription,content",
      s: s as string,
    })) as ListResponseModel<ArticleModel[]>;
  }

  return (
    <Fragment>
      {s ? (
        <Paper
          elevation={1}
          component="header"
          sx={{ padding: 1, paddingRight: 2, paddingLeft: 2, marginBottom: 3 }}
        >
          <Typography
            component="h1"
            variant="subtitle1"
            fontWeight="bold"
          >{`Arama Sonuçları: ${s}`}</Typography>
        </Paper>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={"100%"}
        >
          <SearchInput sx={{ width: "40%" }} />
        </Box>
      )}

      <Box component="section">
        {data?.results?.map((item) => (
          <ArticleItem data={item} key={item._id} />
        ))}
      </Box>

      <Box component="section">
        <Pagination
          routerUrl={`page`}
          totalPages={data.totalPages}
          currentPage={data.currentPage}
        />
      </Box>
    </Fragment>
  );
}

export async function generateMetadata({
  searchParams,
}: BlogSearchProps): Promise<Metadata> {
  const s = searchParams?.s;

  return {
    title: `Arama: ${s}`,
  };
}
