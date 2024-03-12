// ** service
import service from "@/services";

// ** models
import PageModel, { PageFormModel } from "@/models/PageModel";
import ListQueryModel from "@/models/ListQueryModel";
import ListResponseModel from "@/models/ListResponseModel";

// ** utils
import { objectToParams } from "@/utils/params";

// ** config
import { ENDPOINT_URLS } from "@/config";

const PageService = {
  getItems: async (params?: ListQueryModel) =>
    await service<ListResponseModel<PageModel[]> | PageModel[] | null>(
      `${ENDPOINT_URLS.page}${objectToParams(params)}`
    ),
  postItem: async (body: PageFormModel) =>
    service<PageModel>(`${ENDPOINT_URLS.page}`, {
      method: "POST",
      body,
    }),
  patchItem: async (body: PageFormModel) =>
    service<PageModel>(`${ENDPOINT_URLS.page}/${body._id}`, {
      method: "PATCH",
      body,
    }),
  getItemByGuid: async (guid: string) =>
    service<PageModel>(`${ENDPOINT_URLS.page}/getByGuid/${guid}`),
  getItemById: async (id: string) =>
    service<PageModel>(`${ENDPOINT_URLS.page}/getById/${id}`),
};

Object.freeze(PageService);

export default PageService;
