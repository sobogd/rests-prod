import { Request, Post, Route, Security, Response } from "tsoa";
import type { IAuthRequest, ICategory } from "../types";
import pool from "../db";

@Route("categories")
export class CategoriesController {
  @Response(500, "Response with error")
  @Response(401, "Unauthorized request response")
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
