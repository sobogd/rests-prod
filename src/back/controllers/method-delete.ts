import { Body, Post, Request, Response, Route, Security } from "tsoa";
import type { IAuthRequest } from "../types";
import pool from "../db";

@Route("method-delete")
export class MethodDeleteController {
  @Response(500, "Response with error")
  @Response(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("")
  public async methodDelete(@Body() { id }: { id: number }, @Request() auth: IAuthRequest): Promise<void> {
    const client = await pool.connect();

    try {
      await client.query("DELETE FROM payment_methods WHERE id = $1 AND company_id = $2", [
        id,
        auth.user.companyId,
      ]);

      return;
    } finally {
      client.release();
    }
  }
}
