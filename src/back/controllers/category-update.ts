import { Body, Request, Post, Route, Security, Response } from "tsoa";
import { ErrorResponse } from "./users";
import type { IAuthRequest, ICategory } from "../types";
import pool from "../db";

@Route("category-update")
export class CategoryUpdateController {
  @Response<ErrorResponse>(500, "Response with error")
  @Response<ErrorResponse>(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("")
  public async update(@Body() request: ICategory, @Request() { user }: IAuthRequest): Promise<void> {
    const client = await pool.connect();

    try {
      await client.query(
        `UPDATE categories SET name = $1, sort = $2, description = $3, translations = $4 WHERE id = $5 AND company_id = $6`,
        [
          request.name,
          request.sort,
          request.description,
          JSON.stringify(request.translations),
          request.id,
          user.companyId,
        ]
      );
    } finally {
      client.release();
    }
  }
}
