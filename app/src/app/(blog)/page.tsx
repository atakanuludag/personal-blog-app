// ** react
import { Fragment } from "react";

// ** mui
import Box from "@mui/material/Box";

// ** components
import ArticleItem from "@/components/article/Item";
import Pagination from "@/components/Pagination";

// ** service
import ArticleService from "@/services/ArticleService";

// ** models
import ListResponseModel from "@/models/ListResponseModel";
import ArticleModel from "@/models/ArticleModel";
import { OrderType } from "@/models/enums";

// ** config
import { PAGE_SIZE } from "@/config";

export default async function BlogIndex() {
  const data = (
    await ArticleService.getItems({
      page: 1,
      pageSize: PAGE_SIZE,
      order: "publishingDate",
      orderBy: OrderType.ASC,
    })
  )?.data as ListResponseModel<ArticleModel[]>;

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
          currentPage={data.currentPage}
        />
      </Box>
    </Fragment>
  );
}
