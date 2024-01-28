"use client";

// ** third party
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

// ** services
import PageService from "@/services/PageService";

// ** models
import ListQueryModel from "@/models/ListQueryModel";
import PageModel from "@/models/PageModel";
import { BaseErrorModel, BaseModel } from "@/models/BaseModel";

// ** config
import { QUERY_NAMES } from "@/config";

export default function usePageQuery() {
  const service = PageService;
  const queryName = QUERY_NAMES.PAGE;

  const usePageItemsQuery = (params?: ListQueryModel) =>
    useQuery({
      queryKey: [queryName, params],
      queryFn: () => service.getItems(params),
    });

  const usePageItemQuery = (
    id: string,
    options?: Omit<
      UseQueryOptions<BaseErrorModel | BaseModel<PageModel> | null>,
      "queryKey" | "queryFn"
    >
  ) =>
    useQuery({
      queryKey: [queryName, id],
      queryFn: () => service.getItemById(id),
      ...options,
    });

  const usePageGetByGuidQuery = (guid: string) =>
    useQuery({
      queryKey: [queryName],
      queryFn: () => service.getItemByGuid(guid),
    });

  return {
    usePageItemsQuery,
    usePageItemQuery,
    usePageGetByGuidQuery,
  };
}
