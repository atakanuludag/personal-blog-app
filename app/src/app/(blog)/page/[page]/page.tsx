// ** react
import { Fragment } from "react";

// ** next
import { Metadata } from "next";
import { notFound } from "next/navigation";

// ** mui
import Box from "@mui/material/Box";

// ** components
import Pagination from "@/components/Pagination";
import ArticleItem from "@/components/article/Item";

// ** services
import ArticleService from "@/services/ArticleService";

// ** models
import ArticleModel from "@/models/ArticleModel";
import ListResponseModel from "@/models/ListResponseModel";

// ** config
import { PAGE_SIZE } from "@/config";

type BlogPagingProps = {
  params: { page: string };
};

export default async function BlogPaging({ params }: BlogPagingProps) {
  const page = params?.page;

  const currentPage = Number(page);
  if (isNaN(currentPage) || !currentPage) return notFound();

  const data = (await ArticleService.getItems({
    page: currentPage,
    pageSize: PAGE_SIZE,
  })) as ListResponseModel<ArticleModel[]>;

  if (!data) return notFound();

  return (
    <Fragment>
      <Box component="section">
        {data?.results?.map((item) => (
          <ArticleItem data={item} key={item._id} />
        ))}
      </Box>

      <Box component="section">
        <Pagination
          routerUrl={`page`}
          totalPages={data.totalPages}
          currentPage={currentPage}
        />
      </Box>
    </Fragment>
  );
}

export async function generateStaticParams() {
  const items = (await ArticleService.getItems({
    page: 1,
    pageSize: PAGE_SIZE,
  })) as ListResponseModel<ArticleModel[]>;

  const paths = [...Array(items.totalPages)].map((_, page: number) => ({
    page: (page + 1).toString(),
  }));
  return paths;
}

export async function generateMetadata({
  params,
}: BlogPagingProps): Promise<Metadata> {
  const page = params.page;

  return {
    title: `Sayfa: ${page}`,
  };
}
