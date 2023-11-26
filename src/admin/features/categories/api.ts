import { API } from "../../api";
import { IGetCategoryDetails } from "./types";

const categoriesApi = API.injectEndpoints({
  endpoints: (b) => ({
    getCategoryDetails: b.query<IGetCategoryDetails, number>({
      query: (id) => `categories/get-category-details/${id}`,
    }),
    updateCategory: b.mutation<IGetCategoryDetails, IGetCategoryDetails>({
      query: (body) => ({
        url: `categories/update`,
        method: "POST",
        body,
      }),
    }),
    createCategory: b.mutation<IGetCategoryDetails, IGetCategoryDetails>({
      query: (body) => ({
        url: `categories/create`,
        method: "POST",
        body,
      }),
    }),
    archiveCategory: b.mutation<void, number>({
      query: (id) => ({
        url: `categories/archive`,
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
  useLazyGetCategoryDetailsQuery,
  useUpdateCategoryMutation,
  useCreateCategoryMutation,
  useArchiveCategoryMutation,
} = categoriesApi;
