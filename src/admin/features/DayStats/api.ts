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
  }),
  overrideExisting: false,
});

export const { useLazyDayStatsQuery } = dayApi;
