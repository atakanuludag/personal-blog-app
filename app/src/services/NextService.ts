// ** third party
import service from "@/services";

// ** models
import LoginFormModel from "@/models/LoginFormModel";
import TokenModel from "@/models/TokenModel";

// string

// void

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
};

Object.freeze(NextService);

export default NextService;
