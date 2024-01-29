// ** service
import service from "@/services";

// ** models
import ListQueryModel from "@/models/ListQueryModel";
import ListResponseModel from "@/models/ListResponseModel";
import TagModel, { TagFormModel } from "@/models/TagModel";

// ** utils
import { objectToParams } from "@/utils/params";

// ** config
import { ENDPOINT_URLS } from "@/config";

const TagService = {
  getItems: async (params?: ListQueryModel) =>
    service<ListResponseModel<TagModel[]> | TagModel[]>(
      `${ENDPOINT_URLS.tag}${objectToParams(params)}`
    ),
  getItemByGuid: async (guid: string) =>
    service<TagModel>(`${ENDPOINT_URLS.tag}/getByGuid/${guid}`),
  deleteItem: async (id: string) =>
    service(`${ENDPOINT_URLS.tag}/${id}`, {
      method: "DELETE",
    }),
  guidExists: async (guid: string) =>
    service<{ exists: boolean }>(`${ENDPOINT_URLS.tag}/guidExists/${guid}`, {
      method: "GET",
    }).then((res) => res?.data?.exists),
  postItem: async (body: TagFormModel) =>
    service(`${ENDPOINT_URLS.tag}`, {
      method: "POST",
      body,
    }),
  patchItem: async (body: TagFormModel) =>
    service<TagModel>(`${ENDPOINT_URLS.tag}/${body._id}`, {
      method: "PATCH",
      body,
    }),
};

Object.freeze(TagService);

export default TagService;
