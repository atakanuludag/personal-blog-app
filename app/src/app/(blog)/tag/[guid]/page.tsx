// ** react
import { Fragment } from "react";

// ** next
import { Metadata } from "next";
import { notFound } from "next/navigation";

// ** mui
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

// ** services
import ArticleService from "@/services/ArticleService";
import TagService from "@/services/TagService";

// ** components
import ArticleItem from "@/components/article/Item";
import Pagination from "@/components/Pagination";

// ** models
import ArticleModel from "@/models/ArticleModel";
import TagModel from "@/models/TagModel";
import ListResponseModel from "@/models/ListResponseModel";

// ** config
import { PAGE_SIZE } from "@/config";

type BlogTagGuidProps = {
  params: { guid: string };
};

export default async function BlogTagGuid({ params }: BlogTagGuidProps) {
  const guid = params.guid;

  const tagData = await TagService.getItemByGuid(params?.guid);

  const data = (
    await ArticleService.getItems({
      tag: tagData?.data?._id,
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
        >{`Etiket: ${tagData?.data?.title}`}</Typography>
      </Paper>
      <Box component="section">
        {data?.results?.map((item) => (
          <ArticleItem key={item._id} data={item} />
        ))}
      </Box>

      <Box component="section">
        <Pagination
          routerUrl={`tag/${guid}/page`}
          totalPages={data.totalPages}
          currentPage={data.currentPage}
        />
      </Box>
    </Fragment>
  );
}

export async function generateStaticParams() {
  const items = (
    await TagService.getItems({
      paging: 0,
    })
  )?.data as TagModel[];

  const paths = items.map((item) => ({
    guid: item.guid,
  }));
  return paths;
}

export async function generateMetadata({
  params,
}: BlogTagGuidProps): Promise<Metadata> {
  const guid = params.guid;

  const data = await TagService.getItemByGuid(guid);

  return {
    title: `Etiket: ${data?.data?.title}`,
  };
}
