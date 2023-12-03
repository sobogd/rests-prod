import { ICompany } from "../../../back/types";
import { API } from "../../api";

const dayApi = API.injectEndpoints({
  endpoints: (b) => ({
    company: b.query<ICompany, void>({
      query: () => ({
        url: `company`,
        method: "POST",
      }),
    }),
    updateCompany: b.mutation<void, ICompany>({
      query: (company) => ({
        url: `company-update`,
        method: "POST",
        body: company,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLazyCompanyQuery, useUpdateCompanyMutation } = dayApi;
