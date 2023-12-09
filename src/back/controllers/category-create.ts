import { Body, Request, Post, Route, Security, Response } from "tsoa";
import type { IAuthRequest, ICategory } from "../types";
import pool from "../db";

@Route("category-create")
export class CategoryCreateController {
  @Response(500, "Response with error")
  @Response(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("")
  public async create(@Body() request: ICategory, @Request() { user }: IAuthRequest): Promise<void> {
    const client = await pool.connect();

    try {
      await client.query(
        `INSERT INTO categories (company_id, name, sort, description, translations) VALUES ($1,$2,$3,$4,$5)`,
        [
          user.companyId,
          request.name,
          request.sort,
          request.description,
          JSON.stringify(request.translations),
        ]
      );
    } finally {
      client.release();
    }
  }
}
