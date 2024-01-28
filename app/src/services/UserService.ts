// ** service
import service from "@/services";

// ** models
import { UserModel, UserProfileFormModel } from "@/models/UserModel";
import LoginFormModel from "@/models/LoginFormModel";
import TokenModel from "@/models/TokenModel";

// ** config
import { EndpointUrls } from "@/config";

const UserService = {
  login: async (body: LoginFormModel) =>
    service<TokenModel>(`${EndpointUrls.user}/login`, {
      method: "POST",
      body,
    }),
  getProfile: async () => service<UserModel>(`${EndpointUrls.user}/profile`),
  updateProfile: async (body: UserProfileFormModel) =>
    service<UserModel>(`${EndpointUrls.user}/profile`, {
      method: "PATCH",
      body,
    }),
};

Object.freeze(UserService);

export default UserService;
