import { Body, Request, Post, Route, Security, Response } from "tsoa";
import type { IAuthRequest, ICompany } from "../types";
import pool from "../db";

@Route("company-update")
export class CompanyUpdateController {
  @Response(500, "Response with error")
  @Response(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("")
  public async update(@Body() request: ICompany, @Request() { user }: IAuthRequest): Promise<void> {
    const client = await pool.connect();

    try {
      await client.query(
        `UPDATE companies SET 
            title = $1, 
            tin = $2, 
            login = $3, 
            email = $4, 
            currency_symbol = $5, 
            lang = $6, 
            langs = $7 
        WHERE id = $8`,
        [
          request.title,
          request.tin,
          request.login,
          request.email,
          request.currency_symbol,
          request.lang,
          JSON.stringify(request.langs),
          user.companyId,
        ]
      );
    } finally {
      client.release();
    }
  }
}
