import { ICategory } from "../../../back/types";
import { API } from "../../api";

const authApi = API.injectEndpoints({
  endpoints: (b) => ({
    whoami: b.query<any, void>({
      query: () => ({
        url: `whoami`,
        method: "POST",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useWhoamiQuery } = authApi;
