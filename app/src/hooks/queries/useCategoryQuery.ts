"use client";

// ** third party
import { useQuery } from "@tanstack/react-query";

// ** services
import CategoryService from "@/services/CategoryService";

// ** models
import ListQueryModel from "@/models/ListQueryModel";

// ** config
import { QUERY_NAMES } from "@/config";

export default function useCategoryQuery(params?: ListQueryModel) {
  const service = CategoryService;
  const queryName = QUERY_NAMES.CATEGORY;

  const useCategoriesQuery = (enabled: boolean = true) =>
    useQuery({
      queryKey: [queryName, params],
      queryFn: () => service.getItems(params),
      enabled,
    });

  return {
    useCategoriesQuery,
  };
}
