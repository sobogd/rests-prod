import { Post, Route, Security, Request, Response } from "tsoa";
import pool from "../db";
import { IAuthRequest, ITable } from "../types";

@Route("tables")
export class TablesController {
  @Response(500, "Response with error")
  @Response(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("")
  public async tables(@Request() auth: IAuthRequest): Promise<ITable[]> {
    const client = await pool.connect();

    try {
      const tables =
        (await client.query("SELECT * FROM tables WHERE company_id = $1", [auth.user.companyId]))?.rows ?? [];

      return tables;
    } finally {
      client.release();
    }
  }
}
