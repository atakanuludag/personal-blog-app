// ** service
import service from "@/services";

// ** models
import CategoryModel, { CategoryFormModel } from "@/models/CategoryModel";
import ListQueryModel from "@/models/ListQueryModel";
import ListResponseModel from "@/models/ListResponseModel";

// ** utils
import { objectToParams } from "@/utils/params";

// ** config
import { EndpointUrls } from "@/config";

const CategoryService = {
  getItems: async (params?: ListQueryModel) =>
    service<ListResponseModel<CategoryModel[]> | CategoryModel[] | null>(
      `${EndpointUrls.category}${objectToParams(params)}`
    ),
  getItemByGuid: async (guid: string) =>
    service<CategoryModel>(`${EndpointUrls.category}/getByGuid/${guid}`),
  guidExists: async (guid: string) =>
    service<{ exists: boolean }>(
      `${EndpointUrls.category}/guidExists/${guid}`
    ).then((res) => res?.data?.exists),
  deleteItem: async (id: string) =>
    service(`${EndpointUrls.category}/${id}`, { method: "DELETE" }),
  postItem: async (body: CategoryFormModel) =>
    service<CategoryModel>(`${EndpointUrls.category}`, {
      method: "POST",
      body,
    }),
  patchItem: async (body: CategoryFormModel) =>
    service<CategoryModel>(`${EndpointUrls.category}/${body._id}`, {
      method: "PATCH",
      body,
    }),
};

Object.freeze(CategoryService);

export default CategoryService;
