import { Request, Route, Security, Response, Post, Body } from "tsoa";
import type { IAuthRequest, IOrder } from "../types";
import pool from "../db";
import { getUTCTimestamp } from "../../admin/utils/getUTCTimestamp";

@Route("day-stats")
export class DayStatsController {
  @Response(500, "Response with error")
  @Response(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("")
  public async dayStats(@Body() { day }: { day: string }, @Request() auth: IAuthRequest): Promise<IOrder[]> {
    const client = await pool.connect();

    const startDayMs = getUTCTimestamp(day);
    const endDayMs = startDayMs + 86400000;

    try {
      const orders = (
        await client.query(
          `SELECT * FROM o WHERE cid = $1 AND crt >= $2 AND crt <= $3 AND f is not NULL ORDER BY crt ASC`,
          [auth?.user?.companyId, startDayMs, endDayMs]
        )
      )?.rows;

      return orders;
    } finally {
      client.release();
    }
  }
}
