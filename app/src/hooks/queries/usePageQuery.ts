"use client";

import { UseQueryOptions, useQuery } from "react-query";
import { QUERY_NAMES } from "@/config";
import PageService from "@/services/PageService";
import ListQueryModel from "@/models/ListQueryModel";
import PageModel from "@/models/PageModel";

export default function usePageQuery() {
  const service = PageService;
  const queryName = QUERY_NAMES.PAGE;

  const usePageItemsQuery = (params?: ListQueryModel) =>
    useQuery([queryName, params], () => service.getItems(params));

  const usePageItemQuery = (
    id: string,
    options?: Omit<UseQueryOptions<PageModel>, "queryKey" | "queryFn">
  ) => useQuery([queryName, id], () => service.getItemById(id), options);

  const usePageGetByGuidQuery = (guid: string) =>
    useQuery([queryName], () => service.getItemByGuid(guid));

  return {
    usePageItemsQuery,
    usePageItemQuery,
    usePageGetByGuidQuery,
  };
}
