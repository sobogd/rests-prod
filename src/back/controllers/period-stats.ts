import { Request, Route, Security, Response, Post, Body } from "tsoa";
import { ErrorResponse } from "./users";
import type { IAuthRequest } from "../types";
import pool from "../db";
import { getUTCTimestamp } from "../../admin/utils/getUTCTimestamp";
import getSummForOrder from "../../utils/getSummForOrder";

export interface IPeriodStats {
  count: number;
  summary: { summ: number; paymentMethod: string }[];
  total: number;
}

@Route("period-stats")
export class PeriodStatsController {
  @Response<ErrorResponse>(500, "Response with error")
  @Response<ErrorResponse>(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("")
  public async periodStats(
    @Body() { dayStart, dayEnd }: { dayStart: string; dayEnd: string },
    @Request() auth: IAuthRequest
  ): Promise<IPeriodStats> {
    const client = await pool.connect();

    const startDayMs = getUTCTimestamp(dayStart);
    const endDayMs = getUTCTimestamp(dayEnd) + 86400000;

    try {
      const orders =
        (
          await client.query(
            `SELECT * FROM o WHERE cid = $1 AND crt >= $2 AND crt <= $3 AND f is not NULL ORDER BY crt ASC`,
            [auth?.user?.companyId, startDayMs, endDayMs]
          )
        )?.rows ?? [];

      const ordersSummary = orders.map((order) => {
        return {
          summ: getSummForOrder(order.p, order.d).summWithDiscount ?? "No payment method",
          paymentMethod: order.m,
        };
      });

      const summaryByPaymentMethodObject: any = {};

      ordersSummary.forEach((summary) => {
        summaryByPaymentMethodObject[summary.paymentMethod] = {
          summ: (summaryByPaymentMethodObject[summary.paymentMethod]?.summ ?? 0) + (summary.summ ?? 0),
          paymentMethod: summary.paymentMethod,
        };
      });

      const summaryByPaymentMethods: any = Object.values(summaryByPaymentMethodObject);

      const total = summaryByPaymentMethods.reduce(
        (total: any, summary: any) => total + (summary?.summ ?? 0),
        0
      );

      return { count: orders.length, summary: summaryByPaymentMethods, total: total };
    } finally {
      client.release();
    }
  }
}
