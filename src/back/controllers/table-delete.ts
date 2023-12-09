import { Post, Route, Security, Request, Response, Body } from "tsoa";
import pool from "../db";
import { IAuthRequest } from "../types";

@Route("table-delete")
export class TableDeleteController {
  @Response(500, "Response with error")
  @Response(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("")
  public async tableDelete(@Body() { id }: { id: number }, @Request() auth: IAuthRequest): Promise<void> {
    const client = await pool.connect();

    try {
      await client.query(`DELETE FROM tables WHERE id = $1 AND company_id = $2`, [id, auth.user.companyId]);
    } finally {
      client.release();
    }
  }
}
