// ** third party
import service from "@/services";

// ** models
import LoginFormModel from "@/models/LoginFormModel";

const NextService = {
  login: async (body: LoginFormModel): Promise<string> =>
    service(`login`, {
      method: "POST",
      body,
      isLocalApi: true,
    }),
  logout: async (): Promise<void> =>
    service(`logout`, {
      method: "POST",
      isLocalApi: true,
    }),
};

Object.freeze(NextService);

export default NextService;
