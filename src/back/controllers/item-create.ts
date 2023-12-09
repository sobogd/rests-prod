import { Body, Request, Post, Route, Security, Response } from "tsoa";
import type { IAuthRequest, IItem } from "../types";
import { getPhotoFileDataFromBase64 } from "../utils/getPhotoFileDataFromBase64";
import { uploadFileToGoogle } from "../utils/uploadFileToGoogle";
import pool from "../db";

@Route("item-create")
export class ItemCreateController {
  @Response(500, "Response with error")
  @Response(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("")
  public async create(@Body() request: IItem, @Request() { user }: IAuthRequest): Promise<void> {
    const client = await pool.connect();

    try {
      const createdItem = (
        await client.query(
          `INSERT INTO items (company, c, s, n, p, d, i, a, h, v, o, t, vt, ot) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING *`,
          [
            user.companyId,
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
          ]
        )
      )?.rows?.[0] as IItem | undefined;

      if (!!request?.f) {
        const { file, name } = getPhotoFileDataFromBase64(request?.f);
        await uploadFileToGoogle(file, name);
        await client.query(`UPDATE items SET f = $1 WHERE id = $2`, [name, createdItem?.id]);
      }
    } finally {
      client.release();
    }
  }
}
