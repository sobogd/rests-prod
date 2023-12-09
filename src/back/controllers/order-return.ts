import { Route, Security, Response, Post, Body } from "tsoa";
import pool from "../db";

@Route("order-return")
export class OrderReturnController {
  @Response(500, "Response with error")
  @Response(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("")
  public async orderReturn(@Body() { id }: { id: number }): Promise<void> {
    const client = await pool.connect();

    try {
      await client.query(`UPDATE o SET f = NULL WHERE id = $1`, [id]);

      return;
    } finally {
      client.release();
    }
  }
}
