import { Body, Post, Route, Response } from "tsoa";
import dotenv from "dotenv";
import * as bcrypt from "bcryptjs";
import pool from "../db";
import * as crypto from "crypto";
import * as jose from "jose";

dotenv.config();

const secretKey = crypto.createSecretKey((process.env.TOKEN || "").toString(), "utf-8");

@Route("auth")
export class AuthController {
  @Response(500, "Response with error")
  @Response(401, "Unauthorized request response")
  @Post("")
  public async auth(
    @Body() request: { login: string; password: string }
  ): Promise<{ token: string; loginHash: string; name: string }> {
    const client = await pool.connect();

    if (!request.login) {
      throw new Error("Login is empty");
    }

    if (!request.password) {
      throw new Error("Password is empty");
    }

    const loginSplit = request.login.toLowerCase().replaceAll(" ", "").trim().split("-");
    const companyLogin = loginSplit[0];
    const userLogin = loginSplit[1];

    const user = (
      await client.query(
        `SELECT u.password, u.id, u.login, u.type, u.name, u.lang, c.login as "companyLogin" FROM users u LEFT JOIN companies c ON c.id = u.company_id WHERE u.status = 'active' AND c.login = $1 AND u.login = $2`,
        [companyLogin, userLogin]
      )
    )?.rows?.[0];

    if (!user?.id || !user?.password) {
      throw new Error("User with this login not found");
    }

    await client.release();

    const match = await bcrypt.compare(request.password, user.password);

    if (!match) {
      throw new Error("Password is incorrect");
    }

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
