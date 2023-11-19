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
  getItems: async (
    params?: ListQueryModel
  ): Promise<ListResponseModel<PageModel[]> | PageModel[] | null> =>
    await service(`${EndpointUrls.page}${objectToParams(params)}`),

  postItem: async (body: PageFormModel): Promise<void> =>
    service(`${EndpointUrls.page}`, {
      method: "POST",
      body,
    }),
  patchItem: async (body: PageFormModel): Promise<void> =>
    service(`${EndpointUrls.page}/${body._id}`, {
      method: "PATCH",
      body,
    }),
  getItemByGuid: async (guid: string): Promise<PageModel> =>
    service(`${EndpointUrls.page}/getByGuid/${guid}`),
  getItemById: async (id: string): Promise<PageModel> =>
    service(`${EndpointUrls.page}/getById/${id}`),
};

Object.freeze(PageService);

export default PageService;
