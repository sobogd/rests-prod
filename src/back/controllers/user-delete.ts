import { Body, Post, Request, Response, Route, Security } from "tsoa";
import pool from "../db";
import { IAuthRequest } from "../types";

@Route("user-delete")
export class UserDeleteController {
  @Response(500, "Response with error")
  @Response(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("")
  public async userDelete(@Body() request: { id: number }, @Request() auth: IAuthRequest): Promise<void> {
    const client = await pool.connect();

    try {
      await client.query("DELETE FROM users WHERE id = $1 AND company_id = $2", [
        request.id,
        auth.user.companyId,
      ]);
    } finally {
      client.release();
    }
  }
}
