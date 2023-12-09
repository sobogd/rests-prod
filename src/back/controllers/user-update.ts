import { Body, Post, Request, Response, Route, Security } from "tsoa";
import pool from "../db";
import { IAuthRequest, IUser } from "../types";
import * as bcrypt from "bcryptjs";

@Route("user-update")
export class UserUpdateController {
  @Response(500, "Response with error")
  @Response(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("")
  public async userUpdate(@Body() request: IUser, @Request() auth: IAuthRequest): Promise<void> {
    const client = await pool.connect();

    try {
      if (!request.name || !request.type || !request.login || !request.id) {
        throw new Error("Not all fields completed");
      }

      if (request.password && request.password !== "") {
        const newHash = await bcrypt.hash(request.password ?? "", 13);

        await client.query(
          "UPDATE users SET name = $1, type = $2, login = $3, password = $4 WHERE id = $5 AND company_id = $6",
          [request.name, request.type, request.login, newHash, request.id, auth.user.companyId]
        );
      } else {
        await client.query(
          "UPDATE users SET name = $1, type = $2, login = $3 WHERE id = $4 AND company_id = $5",
          [request.name, request.type, request.login, request.id, auth.user.companyId]
        );
      }
    } finally {
      client.release();
    }
  }
}
