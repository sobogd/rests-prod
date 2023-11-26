import { API } from "../../api";

const dayApi = API.injectEndpoints({
  endpoints: (b) => ({
    dayStats: b.query<any, { day: string }>({
      query: ({ day }) => ({
        url: `day-stats`,
        method: "POST",
        body: { day },
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

export const { useLazyDayStatsQuery, useOrderReturnMutation } = dayApi;
