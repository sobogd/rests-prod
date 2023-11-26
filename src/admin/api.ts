import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "./config";
import { RootState, store } from "./app/store";
import { Notice } from "./hooks/useNotification";
import { commonActions } from "./features/common/slice";

export * as categoriesService from "./api/categories";
export * as elementsService from "./api/elements";
export * from "./api/positions";
export * from "./api/users";
export * from "./api/companies";

export const API = createApi({
  reducerPath: "admin/api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).common.user?.token;
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
    validateStatus: (response, result) => {
      if (response.status === 401) {
        Notice.error("Unauthorized");
        if (!response.url.includes("whoami")) {
          store.dispatch(commonActions.signOut());
        }
      }
      if (response.status >= 402 || response.status === 400) {
        Notice.error(result?.message || "Error with request");
      }
      return response.status < 400;
    },
  }),
  endpoints: () => ({}),
});
