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
  getItems: async (
    params?: ListQueryModel
  ): Promise<ListResponseModel<TagModel[]> | TagModel[]> =>
    service(`${EndpointUrls.tag}${objectToParams(params)}`),
  getItemByGuid: async (guid: string): Promise<TagModel> =>
    service(`${EndpointUrls.tag}/getByGuid/${guid}`),
  deleteItem: async (id: string): Promise<void> =>
    service(`${EndpointUrls.tag}/${id}`, {
      method: "DELETE",
    }),
  guidExists: async (guid: string): Promise<boolean> =>
    service(`${EndpointUrls.tag}/guidExists/${guid}`, {
      method: "GET",
    }).then((res) => res?.exists),
  postItem: async (body: TagFormModel): Promise<void> =>
    service(`${EndpointUrls.tag}`, {
      method: "POST",
      body,
    }),
  patchItem: async (body: TagFormModel): Promise<void> =>
    service(`${EndpointUrls.tag}/${body._id}`, {
      method: "PATCH",
      body,
    }),
};

Object.freeze(TagService);

export default TagService;
