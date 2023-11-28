import { IPeriodStats } from "../../../back/controllers/period-stats";
import { API } from "../../api";

const periodApi = API.injectEndpoints({
  endpoints: (b) => ({
    periodStats: b.query<IPeriodStats, { dayStart: string; dayEnd: string }>({
      query: (body) => ({
        url: `period-stats`,
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLazyPeriodStatsQuery } = periodApi;
