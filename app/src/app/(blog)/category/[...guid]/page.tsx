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
import CategoryService from "@/services/CategoryService";

// ** components
import ArticleItem from "@/components/article/Item";
import Pagination from "@/components/Pagination";

// ** models
import ArticleModel from "@/models/ArticleModel";
import ListResponseModel from "@/models/ListResponseModel";
import CategoryModel from "@/models/CategoryModel";

// ** utils
import {
  getLatestParam,
  getPageParam,
  isPagingParams,
} from "@/utils/ParamsOperation";

// ** config
import { PAGE_SIZE } from "@/config";

type BlogCategoriesGuidProps = {
  params: { guid: string[] };
};

export default async function BlogGuid({ params }: BlogCategoriesGuidProps) {
  const guid = params.guid;

  if (!guid) return notFound();

  const isPaging = isPagingParams(guid);
  const latestGuid = getLatestParam(isPaging, guid);
  const categoryData = await CategoryService.getItemByGuid(latestGuid);

  const data = (await ArticleService.getItems({
    category: categoryData._id,
    page: getPageParam(isPaging, guid),
    pageSize: PAGE_SIZE,
    paging: 1,
  })) as ListResponseModel<ArticleModel[]>;

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
        {categoryData?.description && (
          <Typography component="p" variant="caption" color="gray">
            {categoryData.description}
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
          routerUrl={`category/${guid.join("/")}/page`}
          totalPages={data.totalPages}
          currentPage={data.currentPage}
        />
      </Box>
    </Fragment>
  );
}

const generateGuidUrls = (
  data: CategoryModel[],
  parent: string,
  guid: string,
  arr: string[]
): string[] => {
  const find = data.find((p) => p._id === parent);
  if (!find) {
    arr.push(guid);
    return arr;
  }

  arr.unshift(find.guid);

  return generateGuidUrls(data, find.parent?._id as string, guid, arr);
};

export async function generateStaticParams() {
  const categories = (await CategoryService.getItems({
    paging: 0,
  })) as CategoryModel[];

  const paths: {
    guid: string[];
  }[] = [];

  for await (const item of categories) {
    const guidUrls = generateGuidUrls(
      categories,
      item.parent?._id as string,
      item.guid,
      []
    );

    const articlePaging = (await ArticleService.getItems({
      category: item._id,
      paging: 1,
      page: 1,
      pageSize: PAGE_SIZE,
    })) as ListResponseModel<ArticleModel[]>;

    paths.push({
      guid: guidUrls,
    });

    if (articlePaging.totalPages > 1) {
      [...Array(articlePaging.totalPages)].forEach((_, i) => {
        //String(i + 1)
        paths.push({
          guid: [...guidUrls, "page", String(i + 1)],
        });
      });
    }
  }

  return paths;
}

export async function generateMetadata({
  params,
}: BlogCategoriesGuidProps): Promise<Metadata> {
  const guid = params.guid;

  const isPaging = isPagingParams(guid);
  const page = getPageParam(isPaging, guid);

  const latestGuid = getLatestParam(isPaging, guid);
  const data = await CategoryService.getItemByGuid(latestGuid);

  return {
    title: `Kategori: ${data?.title}${isPaging ? `- Sayfa: ${page}` : ""}`,
  };
}
