// ** service
import service from "@/services";

// ** models
import ArticleModel, {
  ArticleFormModel,
  ArticleListQueryModel,
} from "@/models/ArticleModel";
import ListResponseModel from "@/models/ListResponseModel";

// ** utils
import { objectToParams } from "@/utils/params";

// ** config
import { ENDPOINT_URLS } from "@/config";

const ArticleService = {
  getItems: async (params?: ArticleListQueryModel) =>
    service<ListResponseModel<ArticleModel[]> | ArticleModel[]>(
      `${ENDPOINT_URLS.article}${objectToParams(params)}`
    ),
  postItem: async (body: ArticleFormModel) =>
    service<ArticleModel>(`${ENDPOINT_URLS.article}`, {
      method: "POST",
      body,
    }),
  patchItem: async (body: ArticleFormModel) =>
    service<ArticleModel>(`${ENDPOINT_URLS.article}/${body._id}`, {
      method: "PATCH",
      body,
    }),
  getItemByGuid: async (guid: string) =>
    service<ArticleModel>(`${ENDPOINT_URLS.article}/getByGuid/${guid}`),
  getItemById: async (id: string) =>
    service<ArticleModel>(`${ENDPOINT_URLS.article}/getById/${id}`),
  // getLikeIPCheck: async (guid: string, ip: string): Promise<boolean> => {
  //   try {
  //     const res = await axios.get(`/article/likeIpCheck/${guid}`, {
  //       params: {
  //         ip,
  //       },
  //     });
  //     return typeof res.data !== "undefined" ? res.data : true;
  //   } catch (err) {
  //     console.log("[ArticleService] getLikeIPCheck() Error: ", err);
  //     return true;
  //   }
  // },
  likePost: async (id: string) =>
    service<number>(`${ENDPOINT_URLS.article}/like/${id}`, {
      method: "POST",
    }).then((res) => {
      return typeof res !== "undefined" ? res?.data : 0;
    }),
  deleteItem: async (id: string) =>
    service(`${ENDPOINT_URLS.article}/${id}`, {
      method: "DELETE",
    }),
  guidExists: async (guid: string) =>
    service<{ exists: boolean }>(
      `${ENDPOINT_URLS.article}/guidExists/${guid}`
    ).then((res) => res?.data?.exists),
};

Object.freeze(ArticleService);

export default ArticleService;
