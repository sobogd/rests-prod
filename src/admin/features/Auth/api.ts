import { IUser } from "../../../back/mappers/users";
import { API } from "../../api";

const authApi = API.injectEndpoints({
  endpoints: (b) => ({
    whoami: b.query<any, void>({
      query: () => ({
        url: `whoami`,
        method: "POST",
      }),
    }),
    authByCompanyLoginAndPassword: b.mutation<
      { token: string; loginHash: string },
      { login: string; password: string }
    >({
      query: (body) => ({
        url: `auth`,
        method: "POST",
        body,
      }),
    }),
    authByHash: b.mutation<IUser, string>({
      query: (hash) => ({
        url: `auth-hash`,
        method: "POST",
        body: { hash },
      }),
    }),
    register: b.mutation<{ login: string }, any>({
      query: (body) => ({
        url: `registration`,
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useLazyWhoamiQuery,
  useAuthByCompanyLoginAndPasswordMutation,
  useAuthByHashMutation,
  useRegisterMutation,
} = authApi;
