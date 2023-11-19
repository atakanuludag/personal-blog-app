// ** react
import { Fragment } from "react";

// ** next
import { Metadata } from "next";
import { notFound } from "next/navigation";

// ** mui
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

// ** components
import Pagination from "@/components/Pagination";
import ArticleItem from "@/components/article/Item";

// ** services
import ArticleService from "@/services/ArticleService";
import CategoryService from "@/services/CategoryService";

// ** models
import ArticleModel from "@/models/ArticleModel";
import ListResponseModel from "@/models/ListResponseModel";
import CategoryModel from "@/models/CategoryModel";

// ** config
import { PAGE_SIZE } from "@/config";

type BlogCategoryPagingProps = {
  params: { page: string; guid: string };
};

type StaticPathParams = {
  guid: string;
  page: string;
};

export default async function BlogCategoryPaging({
  params,
}: BlogCategoryPagingProps) {
  const page = params?.page;
  const guid = params?.guid;

  const currentPage = Number(page);

  if (isNaN(currentPage) || !currentPage) return notFound();

  const categoryData = await CategoryService.getItemByGuid(guid);

  const data = (await ArticleService.getItems({
    category: categoryData._id,
    page: Number(page),
    pageSize: PAGE_SIZE,
    paging: 1,
  })) as ListResponseModel<ArticleModel[]>;

  if (!data) return notFound();

  return (
    <Fragment>
      <Paper
        elevation={1}
        component="header"
        sx={{ padding: 1, paddingRight: 2, paddingLeft: 2, marginBottom: 3 }}
      >
        <Typography
          component="h1"
          variant="subtitle1"
          fontWeight="bold"
        >{`Kategori: ${categoryData.title}`}</Typography>
      </Paper>
      <Box component="section">
        {data?.results?.map((item) => (
          <ArticleItem key={item._id} data={item} />
        ))}
      </Box>

      <Box component="section">
        <Pagination
          routerUrl={`category/${guid}/page`}
          totalPages={data.totalPages}
          currentPage={data.currentPage}
        />
      </Box>
    </Fragment>
  );
}

export async function generateStaticParams() {
  const categories = (await CategoryService.getItems({
    paging: 0,
  })) as CategoryModel[];

  let categoryGuidTotalPages = [];

  for await (const category of categories) {
    const articlePaging = (await ArticleService.getItems({
      category: category._id,
      paging: 1,
      page: 1,
      pageSize: PAGE_SIZE,
    })) as ListResponseModel<ArticleModel[]>;

    categoryGuidTotalPages.push({
      guid: category.guid,
      totalPages: articlePaging.totalPages,
    });
  }

  const paths = new Array<StaticPathParams>();

  for (const item of categoryGuidTotalPages) {
    if (item.totalPages <= 1) continue;
    [...Array(item.totalPages)].forEach((_, i) => {
      paths.push({
        guid: item.guid,
        page: String(i + 1),
      });
    });
  }

  return paths;
}

export async function generateMetadata({
  params,
}: BlogCategoryPagingProps): Promise<Metadata> {
  const guid = params.guid;
  const page = params.page;

  const item = await CategoryService.getItemByGuid(guid);

  return {
    title: `Kategori: ${item?.title} - Sayfa: ${page}`,
  };
}
