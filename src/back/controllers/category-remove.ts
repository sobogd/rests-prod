import { Body, Request, Post, Route, Security, Response } from "tsoa";
import { ErrorResponse } from "./users";
import type { IAuthRequest } from "../types";
import pool from "../db";

@Route("category-remove")
export class CategoryRemoveController {
  @Response<ErrorResponse>(500, "Response with error")
  @Response<ErrorResponse>(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("")
  public async categoryRemove(@Body() { id }: { id: number }, @Request() auth: IAuthRequest): Promise<void> {
    const client = await pool.connect();

    try {
      const items = await client.query("SELECT COUNT(*) FROM items WHERE company = $1 AND c = $2", [
        auth.user.companyId,
        id,
      ]);

      const itemsCountForCategory = items?.rows?.[0]?.count ?? 0;

      if (itemsCountForCategory > 0) throw new Error("Category have items");

      await client.query("DELETE FROM categories WHERE id = $1", [id]);

      return;
    } finally {
      client.release();
    }
  }
}
