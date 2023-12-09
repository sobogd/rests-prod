import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "./config";
import { RootState, store } from "./store";
import { Notice } from "./hooks/useNotification";

export const API = createApi({
  reducerPath: "admin/api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
    validateStatus: (response, result) => {
      if (response.status === 401) {
        Notice.error("Unauthorized");
      }
      if (response.status >= 402 || response.status === 400) {
        Notice.error(result?.message || "Error with request");
      }
      return response.status < 400;
    },
  }),
  endpoints: () => ({}),
});
