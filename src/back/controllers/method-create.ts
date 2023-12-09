import { Body, Post, Request, Response, Route, Security } from "tsoa";
import type { IAuthRequest, IMethod } from "../types";
import pool from "../db";

@Route("method-create")
export class MethodCreateController {
  @Response(500, "Response with error")
  @Response(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("")
  public async methodCreate(@Body() request: IMethod, @Request() auth: IAuthRequest): Promise<void> {
    const client = await pool.connect();

    try {
      await client.query(`INSERT INTO payment_methods (company_id, title, description) VALUES ($1,$2,$3)`, [
        auth.user.companyId,
        request.title,
        request.description,
      ]);
    } finally {
      client.release();
    }
  }
}
