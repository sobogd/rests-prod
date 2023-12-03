import { Request, Post, Route, Security, Response } from "tsoa";
import { ErrorResponse } from "./users";
import type { IAuthRequest, ICompany } from "../types";
import pool from "../db";

@Route("company")
export class CompanyController {
  @Response<ErrorResponse>(500, "Response with error")
  @Response<ErrorResponse>(401, "Unauthorized request response")
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
