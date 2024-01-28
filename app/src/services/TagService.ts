// ** service
import service from "@/services";

// ** models
import ListQueryModel from "@/models/ListQueryModel";
import ListResponseModel from "@/models/ListResponseModel";
import TagModel, { TagFormModel } from "@/models/TagModel";

// ** utils
import { objectToParams } from "@/utils/params";

// ** config
import { EndpointUrls } from "@/config";

const TagService = {
  getItems: async (params?: ListQueryModel) =>
    service<ListResponseModel<TagModel[]> | TagModel[]>(
      `${EndpointUrls.tag}${objectToParams(params)}`
    ),
  getItemByGuid: async (guid: string) =>
    service<TagModel>(`${EndpointUrls.tag}/getByGuid/${guid}`),
  deleteItem: async (id: string) =>
    service(`${EndpointUrls.tag}/${id}`, {
      method: "DELETE",
    }),
  guidExists: async (guid: string) =>
    service<{ exists: boolean }>(`${EndpointUrls.tag}/guidExists/${guid}`, {
      method: "GET",
    }).then((res) => res?.data?.exists),
  postItem: async (body: TagFormModel) =>
    service(`${EndpointUrls.tag}`, {
      method: "POST",
      body,
    }),
  patchItem: async (body: TagFormModel) =>
    service<TagModel>(`${EndpointUrls.tag}/${body._id}`, {
      method: "PATCH",
      body,
    }),
};

Object.freeze(TagService);

export default TagService;
