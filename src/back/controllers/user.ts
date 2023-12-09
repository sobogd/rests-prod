import { Body, Post, Request, Response, Route, Security } from "tsoa";
import pool from "../db";
import { IAuthRequest, IUser } from "../types";

@Route("user")
export class UserController {
  @Response(500, "Response with error")
  @Response(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("")
  public async user(@Body() { id }: { id: number }, @Request() auth: IAuthRequest): Promise<IUser> {
    const client = await pool.connect();

    try {
      const user = (
        await client.query(`SELECT * FROM users WHERE id = $1 AND company_id = $2 LIMIT 1`, [
          id,
          auth?.user?.companyId,
        ])
      )?.rows?.[0];

      return { ...user, password: undefined };
    } finally {
      client.release();
    }
  }
}
