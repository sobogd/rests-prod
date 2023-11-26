import { API } from "../../api";
import { IUser } from "../../entities/users";
import { IRegistrationRequest } from "./types";

const loginApi = API.injectEndpoints({
  endpoints: (b) => ({
    authByCompanyLoginAndPassword: b.mutation<IUser, { login: string; password: string }>({
      query: (body) => ({
        url: `auth/authorization`,
        method: "POST",
        body,
      }),
    }),
    authByHash: b.mutation<IUser, string>({
      query: (hash) => ({
        url: `auth/hash-authorization`,
        method: "POST",
        body: { hash },
      }),
    }),
    registerCompany: b.mutation<any, IRegistrationRequest>({
      query: (body) => ({
        url: `auth/registration`,
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useAuthByCompanyLoginAndPasswordMutation, useRegisterCompanyMutation, useAuthByHashMutation } =
  loginApi;
