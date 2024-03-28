import { IPeriodStats } from "../../../back/controllers/period-stats";
import { IOrder } from "../../../back/types";
import { API } from "../../api";

const periodApi = API.injectEndpoints({
  endpoints: (b) => ({
    periodStats: b.query<IOrder[], { dayStart: string; dayEnd: string }>({
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
