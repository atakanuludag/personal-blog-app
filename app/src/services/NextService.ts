// ** third party
import service from "@/services";

// ** models
import LoginFormModel from "@/models/LoginFormModel";
import TokenModel from "@/models/TokenModel";
import CacheBodyModel from "@/models/CacheBodyModel";

const NextService = {
  login: async (body: LoginFormModel) =>
    service<TokenModel>(`login`, {
      method: "POST",
      body,
      isLocalApi: true,
    }),
  logout: async () =>
    service(`logout`, {
      method: "POST",
      isLocalApi: true,
    }),
  cacheClear: async (body: CacheBodyModel) =>
    service(`cache`, {
      method: "POST",
      body,
      isLocalApi: true,
    }),
};

Object.freeze(NextService);

export default NextService;
