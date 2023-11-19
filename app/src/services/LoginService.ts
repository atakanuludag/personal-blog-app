// import axios from "@/services";
// import LoginFormModel from "@/models/LoginFormModel";
// import TokenModel from "@/models/TokenModel";

// const serviceBaseUrl = `/user/login`;

// const LoginService = {
//   postLogin: async (data: LoginFormModel): Promise<TokenModel | null> => {
//     try {
//       const ret = await axios.post(`${serviceBaseUrl}`, data);
//       const tokenData: TokenModel = ret.data;
//       if (!tokenData) return null;
//       return tokenData;
//     } catch (err) {
//       console.log("[LoginService] login() Error: ", err);
//       return null;
//     }
//   },
// };

// Object.freeze(LoginService);

// export default LoginService;
