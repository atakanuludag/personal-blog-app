// ** service
import service from "@/services";

// ** models
import CategoryModel, { CategoryFormModel } from "@/models/CategoryModel";
import ListQueryModel from "@/models/ListQueryModel";
import ListResponseModel from "@/models/ListResponseModel";

// ** utils
import { objectToParams } from "@/utils/params";

// ** config
import { ENDPOINT_URLS } from "@/config";

const CategoryService = {
  getItems: async (params?: ListQueryModel) =>
    service<ListResponseModel<CategoryModel[]> | CategoryModel[] | null>(
      `${ENDPOINT_URLS.category}${objectToParams(params)}`
    ),
  getItemByGuid: async (guid: string) =>
    service<CategoryModel>(`${ENDPOINT_URLS.category}/getByGuid/${guid}`),
  guidExists: async (guid: string) =>
    service<{ exists: boolean }>(
      `${ENDPOINT_URLS.category}/guidExists/${guid}`
    ).then((res) => res?.data?.exists),
  deleteItem: async (id: string) =>
    service(`${ENDPOINT_URLS.category}/${id}`, { method: "DELETE" }),
  postItem: async (body: CategoryFormModel) =>
    service<CategoryModel>(`${ENDPOINT_URLS.category}`, {
      method: "POST",
      body,
    }),
  patchItem: async (body: CategoryFormModel) =>
    service<CategoryModel>(`${ENDPOINT_URLS.category}/${body._id}`, {
      method: "PATCH",
      body,
    }),
};

Object.freeze(CategoryService);

export default CategoryService;
