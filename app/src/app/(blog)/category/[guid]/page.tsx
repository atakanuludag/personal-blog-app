// ** react
import { Fragment } from "react";

// ** next
import { Metadata } from "next";
import { notFound } from "next/navigation";

// ** services
import ArticleService from "@/services/ArticleService";
import CategoryService from "@/services/CategoryService";

// ** mui
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

// ** components
import ArticleItem from "@/components/article/Item";
import Pagination from "@/components/Pagination";

// ** models
import ArticleModel from "@/models/ArticleModel";
import CategoryModel from "@/models/CategoryModel";
import ListResponseModel from "@/models/ListResponseModel";

// ** config
import { PAGE_SIZE } from "@/config";

type BlogCategoryGuidProps = {
  params: { guid: string };
};

export default async function BlogGuid({ params }: BlogCategoryGuidProps) {
  const guid = params.guid;

  if (!guid) return notFound();

  const categoryData = await CategoryService.getItemByGuid(params?.guid);

  const data = (
    await ArticleService.getItems({
      category: categoryData?.data?._id,
      page: 1,
      pageSize: PAGE_SIZE,
      paging: 1,
    })
  )?.data as ListResponseModel<ArticleModel[]>;

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
        >{`Kategori: ${categoryData?.data?.title}`}</Typography>
        {categoryData?.data?.description && (
          <Typography component="p" variant="caption" color="gray">
            {categoryData.data?.description}
          </Typography>
        )}
      </Paper>
      <Box component="section">
        {data.results.map((item) => (
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
  const categories = (
    await CategoryService.getItems({
      paging: 0,
      sType: "parent",
      s: "null",
    })
  )?.data as CategoryModel[];

  return categories.map((item) => ({
    guid: item.guid,
  }));
}

export async function generateMetadata({
  params,
}: BlogCategoryGuidProps): Promise<Metadata> {
  const guid = params.guid;
  const item = await CategoryService.getItemByGuid(guid);

  return {
    title: `Kategori: ${item?.data?.title}`,
  };
}
