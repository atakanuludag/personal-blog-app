"use client";

// ** third party
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

// ** services
import TagService from "@/services/TagService";

// ** models
import ListQueryModel from "@/models/ListQueryModel";
import TagModel from "@/models/TagModel";
import ListResponseModel from "@/models/ListResponseModel";

// ** config
import { QUERY_NAMES } from "@/config";

export default function useTagQuery(params?: ListQueryModel) {
  const service = TagService;
  const queryName = QUERY_NAMES.TAG;

  const useTagItemsQuery = (
    options?: UseQueryOptions<
      ListResponseModel<TagModel[]> | TagModel[] | null,
      TagModel,
      ListResponseModel<TagModel[]> | TagModel[] | null,
      any
    >
  ) =>
    useQuery({
      queryKey: [queryName, params],
      queryFn: () => service.getItems(params),
      ...options,
    });

  return {
    useTagItemsQuery,
  };
}
