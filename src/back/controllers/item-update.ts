import { Body, Request, Post, Route, Security, Response } from "tsoa";
import { ErrorResponse } from "./users";
import type { IAuthRequest, IItem } from "../types";
import { getPhotoFileDataFromBase64 } from "../services/files/getPhotoFileDataFromBase64";
import { uploadFileToGoogle } from "../services/files/uploadFileToGoogle";
import deleteFileFromGoogle from "../services/files/deleteFileFromGoogle";
import pool from "../db";

@Route("item-update")
export class ItemUpdateController {
  @Response<ErrorResponse>(500, "Response with error")
  @Response<ErrorResponse>(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("")
  public async update(@Body() request: IItem, @Request() { user }: IAuthRequest): Promise<void> {
    const client = await pool.connect();

    try {
      const updatedItem = (
        await client.query(
          `UPDATE items SET c = $1, s = $2, n = $3, p = $4, d = $5, i = $6, a = $7, h = $8, v = $9, o = $10, t = $11, vt = $12, ot = $13 WHERE id = $14 AND company = $15 RETURNING *`,
          [
            request.c,
            request.s,
            request.n,
            request.p,
            request.d,
            request.i,
            request.a,
            request.h,
            JSON.stringify(request.v),
            JSON.stringify(request.o),
            JSON.stringify(request.t),
            JSON.stringify(request.vt),
            JSON.stringify(request.ot),
            request.id,
            user.companyId,
          ]
        )
      )?.rows?.[0] as IItem | undefined;

      if (!!request.fChanged) {
        if (!!request?.f) {
          const { file, name } = getPhotoFileDataFromBase64(request?.f);
          await uploadFileToGoogle(file, name);
          try {
            if (!!updatedItem?.f) await deleteFileFromGoogle(updatedItem.f);
          } catch {}
          await client.query(`UPDATE items SET f = $1 WHERE id = $2`, [name, updatedItem?.id]);
        } else {
          if (!!updatedItem?.f) {
            try {
              await deleteFileFromGoogle(updatedItem.f);
            } catch {}
            await client.query(`UPDATE items SET f = $1 WHERE id = $2`, [null, updatedItem?.id]);
          }
        }
      }
    } finally {
      client.release();
    }
  }
}
