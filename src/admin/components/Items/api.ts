import { ICategory, IItem } from "../../../back/types";
import { API } from "../../api";

const itemsApi = API.injectEndpoints({
  endpoints: (b) => ({
    items: b.query<IItem[], undefined>({
      query: () => ({
        url: `items`,
        method: "POST",
      }),
    }),
    listCategories: b.query<ICategory[], void>({
      query: () => ({
        url: `categories`,
        method: "POST",
      }),
    }),
    getItemDetails: b.query<IItem, number>({
      query: (itemId) => ({
        url: `item`,
        method: "POST",
        body: { itemId },
      }),
    }),
    updateItem: b.mutation<void, IItem>({
      query: (body) => ({
        url: `item-update`,
        method: "POST",
        body,
      }),
    }),
    createItem: b.mutation<void, IItem>({
      query: (body) => ({
        url: `item-create`,
        method: "POST",
        body,
      }),
    }),
    deleteItem: b.mutation<void, number>({
      query: (itemId) => ({
        url: `item-remove`,
        method: "POST",
        body: {
          itemId,
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useLazyGetItemDetailsQuery,
  useUpdateItemMutation,
  useCreateItemMutation,
  useDeleteItemMutation,
  useItemsQuery,
  useListCategoriesQuery,
} = itemsApi;
