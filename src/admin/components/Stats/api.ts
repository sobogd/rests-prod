import { IPeriodStats } from "../../../back/controllers/period-stats";
import { IOrder } from "../../../back/types";
import { API } from "../../api";

const statsApi = API.injectEndpoints({
  endpoints: (b) => ({
    periodStats: b.query<IOrder[], { dayStart: string; dayEnd: string }>({
      query: (body) => ({
        url: `period-stats`,
        method: "POST",
        body,
      }),
    }),
    orderReturn: b.mutation<any, { id: number }>({
      query: ({ id }) => ({
        url: `order-return`,
        method: "POST",
        body: { id },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLazyPeriodStatsQuery, useOrderReturnMutation } = statsApi;
