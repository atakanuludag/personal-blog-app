"use client";

import {
  QueryClient,
  useInfiniteQuery,
  useQuery,
  UseQueryOptions,
} from "react-query";
import { QUERY_NAMES } from "@/config";
import ArticleService from "@/services/ArticleService";
import ListQueryModel from "@/models/ListQueryModel";
import ListResponseModel from "@/models/ListResponseModel";
import ArticleModel from "@/models/ArticleModel";

export default function useArticleQuery() {
  const service = ArticleService;
  const queryName = QUERY_NAMES.ARTICLE;

  const useArticleItemsQuery = (params: ListQueryModel) =>
    useQuery([queryName, params], () => service.getItems(params));

  const useArticleItemQuery = (
    id: string,
    options?: Omit<UseQueryOptions<ArticleModel>, "queryKey" | "queryFn">
  ) => useQuery([queryName, id], () => service.getItemById(id), options);

  // const articleItemsInfiniteQuery = (
  //   enabled: boolean,
  //   params: ListQueryModel
  // ) =>
  //   useInfiniteQuery(
  //     [queryName],
  //     ({ pageParam }) =>
  //       service.getItems({
  //         ...params,
  //         page: pageParam,
  //       }) as any,
  //     {
  //       enabled,
  //       getNextPageParam: (lastPage: ListResponseModel<ArticleModel[]>) => {
  //         return lastPage.hasNextPage;
  //       },
  //     }
  //   );

  // const articlePrefetchInfiniteQuery = (
  //   queryClient: QueryClient,
  //   params: ListQueryModel
  // ) =>
  //   queryClient.prefetchInfiniteQuery([queryName], () =>
  //     service.getItems(params)
  //   );

  return {
    useArticleItemsQuery,
    useArticleItemQuery,
  };
}
