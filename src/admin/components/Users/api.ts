import { IUser } from "../../../back/types";
import { API } from "../../api";

const categoriesApi = API.injectEndpoints({
  endpoints: (b) => ({
    users: b.query<IUser[], undefined>({
      query: () => ({
        url: `users`,
        method: "POST",
      }),
    }),
    user: b.query<IUser, number>({
      query: (id) => ({
        url: `user`,
        method: "POST",
        body: { id },
      }),
    }),
    userUpdate: b.mutation<void, IUser>({
      query: (body) => ({
        url: `user-update`,
        method: "POST",
        body,
      }),
    }),
    userCreate: b.mutation<void, IUser>({
      query: (body) => ({
        url: `user-create`,
        method: "POST",
        body,
      }),
    }),
    userDelete: b.mutation<void, number>({
      query: (id) => ({
        url: `user-delete`,
        method: "POST",
        body: {
          id,
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useUsersQuery,
  useLazyUserQuery,
  useUserCreateMutation,
  useUserDeleteMutation,
  useUserUpdateMutation,
} = categoriesApi;
