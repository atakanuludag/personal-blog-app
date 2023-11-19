// ** third party
import service from "@/services";

// ** models
import LoginFormModel from "@/models/LoginFormModel";

const NextService = {
  login: async (body: LoginFormModel): Promise<string> =>
    service(
      `login`,
      {
        method: "POST",
        body,
      },
      true
    ),
  logout: async (): Promise<void> =>
    service(
      `logout`,
      {
        method: "POST",
      },
      true
    ),
};

Object.freeze(NextService);

export default NextService;
