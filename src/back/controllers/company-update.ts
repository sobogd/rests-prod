import { Body, Request, Post, Route, Security, Response } from "tsoa";
import type { IAuthRequest, ICompany } from "../types";
import pool from "../db";

@Route("company-update")
export class CompanyUpdateController {
  @Response(500, "Response with error")
  @Response(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("")
  public async update(
    @Body() request: ICompany,
    @Request() { user }: IAuthRequest
  ): Promise<void> {
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
            langs = $7, 
            address = $8, 
            instagram = $9, 
            google_maps_link = $10, 
            phone = $11
        WHERE id = $12`,
        [
          request.title,
          request.tin,
          request.login,
          request.email,
          request.currency_symbol,
          request.lang,
          JSON.stringify(request.langs),
          request.address,
          request.instagram,
          request.google_maps_link,
          request.phone,
          user.companyId,
        ]
      );
    } finally {
      client.release();
    }
  }
}
