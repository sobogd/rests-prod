import { Body, Post, Request, Response, Route, Security } from "tsoa";
import pool from "../db";
import { IAuthRequest, IUser } from "../types";

@Route("users")
export class UsersController {
  @Response(500, "Response with error")
  @Response(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("")
  public async users(@Request() auth: IAuthRequest): Promise<IUser[]> {
    const client = await pool.connect();

    try {
      const users =
        (
          await client.query(`SELECT * from users WHERE company_id = $1 AND id <> $2 ORDER BY name ASC`, [
            auth?.user?.companyId,
            auth?.user?.id,
          ])
        )?.rows?.map((user) => ({
          ...user,
          password: undefined,
        })) ?? [];

      return users;
    } finally {
      client.release();
    }
  }
}
