import { Body, Request, Post, Route, Security, Response } from "tsoa";
import { ErrorResponse } from "./users";
import type { IAuthRequest, ICategory } from "../types";
import pool from "../db";

@Route("category")
export class CategoryController {
  @Response<ErrorResponse>(500, "Response with error")
  @Response<ErrorResponse>(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("")
  public async category(@Body() { id }: { id: number }, @Request() auth: IAuthRequest): Promise<ICategory> {
    const client = await pool.connect();

    try {
      const category = (
        await client.query("SELECT * FROM categories WHERE company_id = $1 AND id = $2", [
          auth?.user?.companyId,
          id,
        ])
      )?.rows?.[0];

      if (!category) throw new Error("Category not found");

      return category;
    } finally {
      client.release();
    }
  }
}
