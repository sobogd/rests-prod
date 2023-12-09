import { Post, Route, Security, Request, Response, Body } from "tsoa";
import pool from "../db";
import { IAuthRequest, ITable } from "../types";

@Route("table-create")
export class TableCreateController {
  @Response(500, "Response with error")
  @Response(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("")
  public async tableCreate(@Body() body: ITable, @Request() auth: IAuthRequest): Promise<void> {
    const client = await pool.connect();

    try {
      await client.query(
        `INSERT INTO tables (number, name, x, y, w, h, type, for_order, company_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
        [
          body.number,
          body.name,
          body.x,
          body.y,
          body.w,
          body.h,
          body.type,
          body.for_order,
          auth.user.companyId,
        ]
      );
    } finally {
      client.release();
    }
  }
}
