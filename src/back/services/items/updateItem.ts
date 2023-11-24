import pool from "../../db";
import { IItem } from "../../mappers/items";
import deleteFileFromGoogle from "../files/deleteFileFromGoogle";
import { getPhotoFileDataFromBase64 } from "../files/getPhotoFileDataFromBase64";
import { uploadFileToGoogle } from "../files/uploadFileToGoogle";

export default async (requestItem: IItem, companyId: number) => {
  const client = await pool.connect();

  try {
    const updatedItem = (
      await client.query(
        `UPDATE items SET c = $1, s = $2, n = $3, p = $4, d = $5, i = $6, a = $7, h = $8, v = $9, o = $10, t = $11, vt = $12, ot = $13 WHERE id = $14 AND company = $15 RETURNING *`,
        [
          requestItem.c,
          requestItem.s,
          requestItem.n,
          requestItem.p,
          requestItem.d,
          requestItem.i,
          requestItem.a,
          requestItem.h,
          JSON.stringify(requestItem.v),
          JSON.stringify(requestItem.o),
          JSON.stringify(requestItem.t),
          JSON.stringify(requestItem.vt),
          JSON.stringify(requestItem.ot),
          requestItem.id,
          companyId,
        ]
      )
    )?.rows?.[0] as IItem | undefined;

    if (!!requestItem.fChanged) {
      if (!!requestItem?.f) {
        const { file, name } = getPhotoFileDataFromBase64(requestItem?.f);
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
};
