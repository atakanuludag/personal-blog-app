"use client";

import { useQuery } from "react-query";
import { QUERY_NAMES } from "@/config";
import CategoryService from "@/services/CategoryService";
import ListQueryModel from "@/models/ListQueryModel";

export default function useCategoryQuery(params?: ListQueryModel) {
  const service = CategoryService;
  const queryName = QUERY_NAMES.CATEGORY;

  const useCategoriesQuery = (enabled: boolean = true) =>
    useQuery([queryName, params], () => service.getItems(params), { enabled });

  return {
    useCategoriesQuery,
  };
}
