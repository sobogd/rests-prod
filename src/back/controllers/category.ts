import { Body, Request, Post, Route, Security, Response } from "tsoa";
import { ErrorResponse } from "./users";
import type { IAuthRequest, ICategory, IItem } from "../types";
import pool from "../db";

@Route("category")
export class CategoryController {
  @Response<ErrorResponse>(500, "Response with error")
  @Response<ErrorResponse>(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("")
  public async category(@Request() auth: IAuthRequest): Promise<ICategory> {
    const client = await pool.connect();

    try {
      const category = (
        await client.query(
          "SELECT id, name, description, translations, sort FROM categories WHERE company_id = $1",
          [auth.user.companyId]
        )
      )?.rows?.[0];

      if (!category) throw new Error("Category not found");

      return category;
    } finally {
      client.release();
    }
  }
}
