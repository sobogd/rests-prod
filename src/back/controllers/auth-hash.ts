import { Body, Post, Route, Response } from "tsoa";
import dotenv from "dotenv";
import pool from "../db";
import * as crypto from "crypto";
import * as jose from "jose";

dotenv.config();

const secretKey = crypto.createSecretKey((process.env.TOKEN || "").toString(), "utf-8");

@Route("auth-hash")
export class AuthHashController {
  @Response(500, "Response with error")
  @Response(401, "Unauthorized request response")
  @Post("")
  public async auth(
    @Body() request: { hash: string }
  ): Promise<{ token: string; loginHash: string; name: string }> {
    const client = await pool.connect();

    if (!request.hash) {
      throw new Error("Hash is empty");
    }

    const { payload } = await jose.jwtVerify(request.hash, secretKey);

    if (!payload || !payload.id || !payload.password) {
      throw new Error("Invalid hash");
    }

    const user = (
      await client.query(
        `SELECT u.password, u.id, u.login, u.type, u.name, u.lang, c.login as "companyLogin" FROM users u LEFT JOIN companies c ON c.id = u.company_id WHERE u.status = 'active' AND u.id = $1 AND u.password = $2`,
        [payload.id, payload.password]
      )
    )?.rows?.[0];

    if (!user?.id || !user?.password) {
      throw new Error("User with this login not found");
    }

    await client.release();

    const token = await new jose.SignJWT({
      id: user.id,
      name: user.name,
      login: user.login,
      type: user.type,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("12h")
      .sign(secretKey);

    const loginHash = await new jose.SignJWT({
      id: user.id,
      password: user.password,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("365d")
      .sign(secretKey);

    return {
      name: user.name ?? "",
      token,
      loginHash,
    };
  }
}
