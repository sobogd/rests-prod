import { Body, Post, Route, Response } from "tsoa";
import { ErrorResponse } from "./users";
import * as bcrypt from "bcryptjs";
import pool from "../db";

@Route("registration")
export class RegistrationController {
  @Response<ErrorResponse>(500, "Response with error")
  @Post("")
  public async registration(
    @Body()
    request: {
      email: string;
      title: string;
      login: string;
      tin: string;
      password: string;
      lang: string;
      currency: string;
    }
  ): Promise<{ login: string }> {
    const client = await pool.connect();

    const foundedCompany = (
      await client.query("SELECT * FROM companies WHERE login = $1 OR email = $2 OR tin = $3", [
        request.login,
        request.email,
        request.tin,
      ])
    )?.rows?.[0];

    if (foundedCompany != null) {
      if (foundedCompany.email === request.email) throw new Error("Company with this email already exist");
      if (foundedCompany.login === request.login) throw new Error("Company with this login already exist");
      if (foundedCompany.tin === request.tin) throw new Error("Company with this TIN already exist");
    }

    const { rows: lastRateIds } = await client.query("SELECT id FROM rates ORDER BY id DESC LIMIT 1");
    const lastRateId = lastRateIds?.[0];

    const createdCompany = (
      await client.query(
        `
        INSERT INTO companies 
            (title, login, currency_symbol, email, lang, tin, balance, rate_id) 
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8) 
        RETURNING *
    `,
        [
          request.title,
          request.login.toLowerCase().replaceAll(" ", "").trim(),
          request.currency,
          request.email,
          request.lang,
          request.tin,
          0,
          1,
        ]
      )
    )?.rows?.[0];

    if (!createdCompany?.id) {
      throw new Error("Error while creating company");
    }

    const userPassword = await bcrypt.hash(request.password, 13);

    const createdUser = (
      await client.query(
        "INSERT INTO users (name, login, password, type, company_id, status) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
        ["Administrator", "admin", userPassword, "admin", createdCompany.id, "active"]
      )
    )?.rows?.[0];

    if (!createdUser?.id) {
      throw new Error("Error while creating administrator for company");
    }

    await client.release();

    return { login: createdCompany.login ?? "" };
  }
}
