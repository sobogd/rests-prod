import { Post, Route, Security, Request, Response, Body } from "tsoa";
import pool from "../db";
import { IAuthRequest, ITable } from "../types";

@Route("table-update")
export class TableUpdateController {
  @Response(500, "Response with error")
  @Response(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("")
  public async tableUpdate(@Body() body: ITable, @Request() auth: IAuthRequest): Promise<void> {
    const client = await pool.connect();

    try {
      await client.query(
        `UPDATE tables SET 
         number = $1, 
         name = $2, 
         x = $3, 
         y = $4, 
         w = $5, 
         h = $6, 
         type = $7, 
         for_order = $8 
         WHERE id = $9 AND company_id = $10`,
        [
          body.number,
          body.name,
          body.x,
          body.y,
          body.w,
          body.h,
          body.type,
          body.for_order,
          body.id,
          auth.user.companyId,
        ]
      );
    } finally {
      client.release();
    }
  }
}
