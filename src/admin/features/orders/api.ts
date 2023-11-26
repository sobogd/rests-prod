import { IPaymentMethod } from "../../../back/mappers/paymentMethods";
import { IOrder } from "../../../back/types/o";
import { API } from "../../api";
import { ITable } from "../map/types";
import { IItem } from "../positions/types";

const ordersApi = API.injectEndpoints({
  endpoints: (b) => ({
    listCategoriesWithPositions: b.query<{ c: string; i: IItem[] }[], void>({
      query: () => `o/list-categories-with-positions`,
    }),
    addOrUpdateOrder: b.mutation<number, IOrder>({
      query: (body) => ({ url: `o/add-or-update-order`, method: "POST", body }),
    }),
    listOrdersForTable: b.query<IOrder[], { tableId: number }>({
      query: ({ tableId }) => ({ url: `o/list-orders-for-table`, method: "POST", body: { tableId } }),
    }),
    loadOrderByNumber: b.query<IOrder, { orderNumber: number }>({
      query: ({ orderNumber }) => ({ url: `o/order-by-number`, method: "POST", body: { orderNumber } }),
    }),
    removeOrderByNumber: b.mutation<void, { orderNumber: number }>({
      query: ({ orderNumber }) => ({
        url: `o/remove-order-by-number`,
        method: "POST",
        body: { orderNumber },
      }),
    }),
    finishOrderByNumber: b.mutation<void, { orderNumber: number; paymentMethod: string }>({
      query: ({ orderNumber, paymentMethod }) => ({
        url: `o/finish-order-by-number`,
        method: "POST",
        body: { orderNumber, paymentMethod },
      }),
    }),
    tablesWithOrders: b.query<{ t: number; f?: boolean }[], void>({
      query: () => `o/tables-with-orders`,
    }),
    allTables: b.query<ITable[], void>({
      query: () => ({ url: `/tables/search`, method: "POST" }),
    }),
    paymentMethods: b.query<IPaymentMethod[], void>({
      query: () => ({ url: `/paymentMethods/search`, method: "POST" }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useListCategoriesWithPositionsQuery,
  useAddOrUpdateOrderMutation,
  useLazyListOrdersForTableQuery,
  useLazyLoadOrderByNumberQuery,
  useRemoveOrderByNumberMutation,
  useFinishOrderByNumberMutation,
  useAllTablesQuery,
  useLazyTablesWithOrdersQuery,
  usePaymentMethodsQuery,
} = ordersApi;
