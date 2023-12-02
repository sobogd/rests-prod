import { Body, Request, Post, Route, Security, Response } from "tsoa";
import { ErrorResponse } from "./users";
import type { IAuthRequest, ICategory, IItem } from "../types";
import pool from "../db";

@Route("categories")
export class CategoriesController {
  @Response<ErrorResponse>(500, "Response with error")
  @Response<ErrorResponse>(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("")
  public async categories(@Request() auth: IAuthRequest): Promise<ICategory[]> {
    const client = await pool.connect();

    try {
      const categories =
        (
          await client.query("SELECT id, name, sort FROM categories WHERE company_id = $1", [
            auth.user.companyId,
          ])
        )?.rows ?? [];

      return categories;
    } finally {
      client.release();
    }
  }
}
