import { Body, Post, Request, Response, Route, Security } from "tsoa";
import type { IAuthRequest, IMethod } from "../types";
import pool from "../db";

@Route("method-update")
export class MethodUpdateController {
  @Response(500, "Response with error")
  @Response(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("")
  public async methodUpdate(@Body() request: IMethod, @Request() auth: IAuthRequest): Promise<void> {
    const client = await pool.connect();

    try {
      await client.query(
        `UPDATE payment_methods SET title = $1, description = $2 WHERE id = $3 AND company_id = $4`,
        [request.title, request.description, request.id, auth.user.companyId]
      );
    } finally {
      client.release();
    }
  }
}
