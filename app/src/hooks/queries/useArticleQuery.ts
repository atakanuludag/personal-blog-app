"use client";

// ** third party
import { useQuery, UseQueryOptions } from "react-query";

// ** services
import ArticleService from "@/services/ArticleService";

// ** models
import ListQueryModel from "@/models/ListQueryModel";
import ArticleModel from "@/models/ArticleModel";

// ** config
import { QUERY_NAMES } from "@/config";

export default function useArticleQuery() {
  const service = ArticleService;
  const queryName = QUERY_NAMES.ARTICLE;

  const useArticleItemsQuery = (params: ListQueryModel) =>
    useQuery([queryName, params], () => service.getItems(params));

  const useArticleItemQuery = (
    id: string,
    options?: Omit<UseQueryOptions<ArticleModel>, "queryKey" | "queryFn">
  ) => useQuery([queryName, id], () => service.getItemById(id), options);

  return {
    useArticleItemsQuery,
    useArticleItemQuery,
  };
}
