import { IAllPositionsForKitchen } from "../../../back/types";
import { API } from "../../api";

const ordersApi = API.injectEndpoints({
  endpoints: (b) => ({
    listCategoriesForFilter: b.query<{ n: string; i: number }[], void>({
      query: () => `k/list-categories-for-filter`,
    }),
    listPositionsByCategories: b.query<IAllPositionsForKitchen[], void>({
      query: () => `k/list-positions-by-categories`,
    }),
    donePosition: b.mutation<
      void,
      { orderNumber: number; positionIndex: number; doneTime: number }
    >({
      query: ({ orderNumber, positionIndex, doneTime }) => ({
        url: `k/done-position`,
        method: "POST",
        body: { orderNumber, positionIndex, doneTime },
      }),
    }),
    restartPosition: b.mutation<
      void,
      { orderNumber: number; positionIndex: number }
    >({
      query: ({ orderNumber, positionIndex }) => ({
        url: `k/restart-position`,
        method: "POST",
        body: { orderNumber, positionIndex },
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useListCategoriesForFilterQuery,
  useLazyListPositionsByCategoriesQuery,
  useDonePositionMutation,
  useRestartPositionMutation,
} = ordersApi;
