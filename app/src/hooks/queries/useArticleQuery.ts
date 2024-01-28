"use client";

// ** third party
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

// ** services
import ArticleService from "@/services/ArticleService";

// ** models
import ListQueryModel from "@/models/ListQueryModel";
import ArticleModel from "@/models/ArticleModel";
import { BaseErrorModel, BaseModel } from "@/models/BaseModel";

// ** config
import { QUERY_NAMES } from "@/config";

export default function useArticleQuery() {
  const service = ArticleService;
  const queryName = QUERY_NAMES.ARTICLE;

  const useArticleItemsQuery = (params: ListQueryModel) =>
    useQuery({
      queryKey: [queryName, params],
      queryFn: () => service.getItems(params),
    });

  const useArticleItemQuery = (
    id: string,
    options?: Omit<
      UseQueryOptions<BaseErrorModel | BaseModel<ArticleModel> | null>,
      "queryKey" | "queryFn"
    >
  ) =>
    useQuery({
      queryKey: [queryName, id],
      queryFn: () => service.getItemById(id),
      ...options,
    });

  return {
    useArticleItemsQuery,
    useArticleItemQuery,
  };
}
