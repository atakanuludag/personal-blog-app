import service from "@/services";
import CategoryModel, { CategoryFormModel } from "@/models/CategoryModel";
import ListQueryModel from "@/models/ListQueryModel";
import ListResponseModel from "@/models/ListResponseModel";
import { objectToParams } from "@/utils/params";
import { EndpointUrls } from "@/config";

const CategoryService = {
  getItems: async (
    params?: ListQueryModel
  ): Promise<ListResponseModel<CategoryModel[]> | CategoryModel[] | null> =>
    service(`${EndpointUrls.category}${objectToParams(params)}`),
  getItemByGuid: async (guid: string): Promise<CategoryModel> =>
    service(`${EndpointUrls.category}/getByGuid/${guid}`),
  guidExists: async (guid: string): Promise<boolean> =>
    service(`${EndpointUrls.category}/guidExists/${guid}`).then(
      (res) => res.exists
    ),
  deleteItem: async (id: string): Promise<void> =>
    service(`${EndpointUrls.category}/${id}`, { method: "DELETE" }),
  postItem: async (body: CategoryFormModel): Promise<void> =>
    service(`${EndpointUrls.category}`, {
      method: "POST",
      body,
    }),
  patchItem: async (body: CategoryFormModel): Promise<void> =>
    service(`${EndpointUrls.category}/${body._id}`, {
      method: "PATCH",
      body,
    }),
};

Object.freeze(CategoryService);

export default CategoryService;
