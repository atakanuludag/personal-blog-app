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
import TagService from "@/services/TagService";

// ** models
import ArticleModel from "@/models/ArticleModel";
import ListResponseModel from "@/models/ListResponseModel";
import TagModel from "@/models/TagModel";

// ** config
import { PAGE_SIZE } from "@/config";

type BlogTagPagingProps = {
  params: { page: string; guid: string };
};

type StaticPathParams = {
  guid: string;
  page: string;
};

export default async function BlogTagPaging({ params }: BlogTagPagingProps) {
  const page = params?.page;
  const guid = params?.guid;

  const currentPage = Number(page);

  if (isNaN(currentPage) || !currentPage) return notFound();

  const tagData = await TagService.getItemByGuid(guid);

  const data = (
    await ArticleService.getItems({
      tag: tagData?.data?._id,
      page: Number(page),
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
  const tags = (
    await TagService.getItems({
      paging: 0,
    })
  )?.data as TagModel[];
  let tagGuidTotalPages = [];

  for await (const tag of tags) {
    const articlePaging = (
      await ArticleService.getItems({
        tag: tag._id,
        paging: 1,
        page: 1,
        pageSize: PAGE_SIZE,
      })
    )?.data as ListResponseModel<ArticleModel[]>;

    tagGuidTotalPages.push({
      guid: tag.guid,
      totalPages: articlePaging.totalPages,
    });
  }

  const paths = new Array<StaticPathParams>();

  for (const tag of tagGuidTotalPages) {
    if (tag.totalPages <= 1) continue;
    [...Array(tag.totalPages)].forEach((_, i) => {
      paths.push({
        guid: tag.guid,
        page: String(i + 1),
      });
    });
  }

  return paths;
}

export async function generateMetadata({
  params,
}: BlogTagPagingProps): Promise<Metadata> {
  const guid = params.guid;
  const page = params.page;

  const data = await TagService.getItemByGuid(guid);

  return {
    title: `Etiket: ${data?.data?.title} - Sayfa: ${page}`,
  };
}
