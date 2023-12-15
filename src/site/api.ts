import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "./config";
import { IPublicResponse } from "../back/types";

export const API = createApi({
  reducerPath: "site/api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: (b) => ({
    company: b.query<IPublicResponse, string>({
      query: (login) => ({
        url: `public-company`,
        method: "POST",
        body: { login },
      }),
    }),
  }),
});

export const { useLazyCompanyQuery, useCompanyQuery } = API;
