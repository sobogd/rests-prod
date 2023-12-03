import { Request, Post, Route, Security, Response } from "tsoa";
import { ErrorResponse } from "./users";
import type { IAuthRequest, IWhoAmI } from "../types";
import pool from "../db";

@Route("whoami")
export class WhoamiController {
  @Response<ErrorResponse>(500, "Response with error")
  @Response<ErrorResponse>(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("")
  public async whoami(@Request() auth: IAuthRequest): Promise<IWhoAmI> {
    const client = await pool.connect();

    try {
      const company = (await client.query("SELECT * FROM companies WHERE id = $1", [auth?.user?.companyId]))
        ?.rows?.[0];

      if (!company) throw new Error("Company not found");

      const user = (await client.query("SELECT * FROM users WHERE id = $1", [auth?.user?.id]))?.rows?.[0];

      if (!user) throw new Error("User not found");

      return {
        company: {
          id: company.id,
          title: company.title,
          email: company.email,
          symbol: company.currency_symbol,
          lang: company.lang,
          langs: company.langs ?? [],
        },
        user: {
          id: user.id,
          name: user.name,
          login: user.login,
          type: user.type,
        },
      };
    } finally {
      client.release();
    }
  }
}
