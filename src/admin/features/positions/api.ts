import { IItem } from "../../../back/mappers/items";
import { API } from "../../api";
import { ICategory } from "../categories/types";

export interface IGetPositionDetails {
  id?: number;
  name: string;
  description?: string;
  price: number;
  isAdditional: boolean;
  hide: boolean;
  multipleChoice: boolean;
  sort?: number;
  additional: number[];
  categories: number[];
  composition: { elementId: number; weight: number }[];
  translations: { code: string; name: string }[];
  file?: File;
  isFileChanged?: boolean;
  fileName?: string;
}

const positionsApi = API.injectEndpoints({
  endpoints: (b) => ({
    positions: b.query<IItem[], undefined>({
      query: () => ({
        url: `items/list`,
        method: "POST",
      }),
    }),
    listCategories: b.query<ICategory[], void>({
      query: () => ({
        url: `categories/search`,
        method: "POST",
      }),
    }),
    getPositionDetails: b.query<IItem, number>({
      query: (itemId) => ({
        url: `items/get`,
        method: "POST",
        body: { itemId },
      }),
    }),
    updatePosition: b.mutation<void, IItem>({
      query: (body) => ({
        url: `items/update`,
        method: "POST",
        body,
      }),
    }),
    createPosition: b.mutation<void, IItem>({
      query: (body) => ({
        url: `items/create`,
        method: "POST",
        body,
      }),
    }),
    deletePosition: b.mutation<void, number>({
      query: (id) => ({
        url: `items/delete`,
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
  useLazyGetPositionDetailsQuery,
  useUpdatePositionMutation,
  useCreatePositionMutation,
  useDeletePositionMutation,
  usePositionsQuery,
} = positionsApi;
