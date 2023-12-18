import { ICategory } from "../../../back/types";
import { API } from "../../api";

const categoriesApi = API.injectEndpoints({
  endpoints: (b) => ({
    categories: b.query<ICategory[], void>({
      query: () => ({
        url: `categories`,
        method: "POST",
      }),
    }),
    category: b.query<ICategory, number>({
      query: (id) => ({
        url: `category`,
        method: "POST",
        body: { id },
      }),
    }),
    updateCategory: b.mutation<void, ICategory>({
      query: (body) => ({
        url: `category-update`,
        method: "POST",
        body,
      }),
    }),
    createCategory: b.mutation<void, ICategory>({
      query: (body) => ({
        url: `category-create`,
        method: "POST",
        body,
      }),
    }),
    deleteCategory: b.mutation<void, number>({
      query: (id) => ({
        url: `category-remove`,
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
  useCategoriesQuery,
  useLazyCategoriesQuery,
  useLazyCategoryQuery,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
  useCreateCategoryMutation,
} = categoriesApi;
