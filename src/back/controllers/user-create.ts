import { Body, Post, Request, Response, Route, Security } from "tsoa";
import pool from "../db";
import { IAuthRequest, IUser } from "../types";
import * as bcrypt from "bcryptjs";

@Route("user-create")
export class UserCreateController {
  @Response(500, "Response with error")
  @Response(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("")
  public async userCreate(@Body() request: IUser, @Request() auth: IAuthRequest): Promise<void> {
    const client = await pool.connect();

    try {
      if (!request.name || !request.type || !request.password || !request.login) {
        throw new Error("Not all fields completed");
      }

      const newHash = await bcrypt.hash(request.password ?? "", 13);

      await client.query(
        `INSERT INTO users (name, login, password, type, company_id) VALUES ($1,$2,$3,$4,$5)`,
        [request.name, request.login, newHash, request.type, auth.user.companyId]
      );
    } finally {
      client.release();
    }
  }
}
