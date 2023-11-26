import { API } from "../../api";
import { IDailySummaryReport, IDayDetailsReport } from "./types";
import { format } from "date-fns";

const statisticsApi = API.injectEndpoints({
  endpoints: (b) => ({
    getStatistic: b.query<IDailySummaryReport[], { startDate: string; endDate: string }>({
      query: ({ startDate, endDate }) => ({
        url: `reports/get_report`,
        method: "POST",
        body: {
          startDate: format(new Date(startDate), "yyyy-MM-dd"),
          endDate: format(new Date(endDate), "yyyy-MM-dd"),
          type: "DAILY",
        },
      }),
    }),
    getDayDetails: b.query<IDayDetailsReport[], string>({
      query: (day) => ({
        url: `reports/getOrdersHistory`,
        method: "POST",
        body: {
          date: format(new Date(day), "yyyy-MM-dd"),
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLazyGetStatisticQuery, useLazyGetDayDetailsQuery } = statisticsApi;
