import { Body, Request, Post, Route, Security, Response } from "tsoa";
import { ErrorResponse } from "./users";
import type { IAuthRequest, IItem } from "../types";
import pool from "../db";

@Route("item")
export class ItemController {
  @Response<ErrorResponse>(500, "Response with error")
  @Response<ErrorResponse>(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("")
  public async item(@Body() { itemId }: { itemId: number }, @Request() req: IAuthRequest): Promise<IItem> {
    const client = await pool.connect();

    try {
      const item = (
        await client.query(`SELECT * FROM items WHERE id = $1 AND company = $2 LIMIT 1`, [
          itemId,
          req.user.companyId,
        ])
      )?.rows?.[0] as IItem | undefined;

      if (!item) throw new Error("Item not found");

      return item;
    } finally {
      client.release();
    }
  }
}
