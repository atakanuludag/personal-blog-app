// ** service
import service from "@/services";

// ** models
import { UserModel, UserProfileFormModel } from "@/models/UserModel";
import LoginFormModel from "@/models/LoginFormModel";
import TokenModel from "@/models/TokenModel";

// ** config
import { ENDPOINT_URLS } from "@/config";

const UserService = {
  login: async (body: LoginFormModel) =>
    service<TokenModel>(`${ENDPOINT_URLS.user}/login`, {
      method: "POST",
      body,
    }),
  getProfile: async () => service<UserModel>(`${ENDPOINT_URLS.user}/profile`),
  updateProfile: async (body: UserProfileFormModel) =>
    service<UserModel>(`${ENDPOINT_URLS.user}/profile`, {
      method: "PATCH",
      body,
    }),
};

Object.freeze(UserService);

export default UserService;
