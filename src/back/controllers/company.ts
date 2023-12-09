import { Request, Post, Route, Security, Response } from "tsoa";
import type { IAuthRequest, ICompany } from "../types";
import pool from "../db";

@Route("company")
export class CompanyController {
  @Response(500, "Response with error")
  @Response(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("")
  public async company(@Request() auth: IAuthRequest): Promise<ICompany> {
    const client = await pool.connect();

    try {
      const company = (await client.query("SELECT * FROM companies WHERE id = $1", [auth?.user?.companyId]))
        ?.rows?.[0];

      if (!company) throw new Error("Company not found");

      return company;
    } finally {
      client.release();
    }
  }
}
