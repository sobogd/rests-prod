import { Body, Request, Post, Route, Security, Response } from "tsoa";
import type { IAuthRequest, IItem } from "../types";
import pool from "../db";
import deleteFileFromGoogle from "../utils/deleteFileFromGoogle";

@Route("item-remove")
export class ItemRemoveController {
  @Response(500, "Response with error")
  @Response(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("")
  public async delete(@Body() { itemId }: { itemId: number }, @Request() auth: IAuthRequest): Promise<void> {
    const client = await pool.connect();
    try {
      const deletedItem = (
        await client.query(`DELETE FROM items WHERE id = $1 AND company = $2 RETURNING *`, [
          itemId,
          auth.user.companyId ?? "",
        ])
      )?.rows?.[0] as IItem | undefined;

      if (!!deletedItem?.f) {
        await deleteFileFromGoogle(deletedItem.f);
      }
    } finally {
      client.release();
    }
  }
}
