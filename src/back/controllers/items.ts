import { Body, Request, Post, Route, Security, Response } from "tsoa";
import type { IAuthRequest, IItem } from "../types";
import pool from "../db";

@Route("items")
export class ItemsController {
  @Response(500, "Response with error")
  @Response(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("")
  public async items(@Body() request: IItem, @Request() { user }: IAuthRequest): Promise<IItem[]> {
    const client = await pool.connect();

    try {
      const items = (
        await client.query(`SELECT id, n, p, s, c FROM items WHERE company = $1 ORDER BY s, n, id ASC`, [
          user.companyId,
        ])
      )?.rows as IItem[] | undefined;

      if (items?.length === undefined) throw new Error("Items not found");

      return items ?? [];
    } finally {
      client.release();
    }
  }
}
