// ** service
import service from "@/services";

// ** models
import PageModel, { PageFormModel } from "@/models/PageModel";
import ListQueryModel from "@/models/ListQueryModel";
import ListResponseModel from "@/models/ListResponseModel";

// ** utils
import { objectToParams } from "@/utils/params";

// ** config
import { EndpointUrls } from "@/config";

const PageService = {
  getItems: async (params?: ListQueryModel) =>
    await service<ListResponseModel<PageModel[]> | PageModel[] | null>(
      `${EndpointUrls.page}${objectToParams(params)}`
    ),
  postItem: async (body: PageFormModel) =>
    service<PageModel>(`${EndpointUrls.page}`, {
      method: "POST",
      body,
    }),
  patchItem: async (body: PageFormModel) =>
    service<PageModel>(`${EndpointUrls.page}/${body._id}`, {
      method: "PATCH",
      body,
    }),
  getItemByGuid: async (guid: string) =>
    service<PageModel>(`${EndpointUrls.page}/getByGuid/${guid}`),
  getItemById: async (id: string) =>
    service<PageModel>(`${EndpointUrls.page}/getById/${id}`),
};

Object.freeze(PageService);

export default PageService;
