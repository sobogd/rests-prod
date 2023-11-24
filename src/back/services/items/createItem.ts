import pool from "../../db";
import { IItem } from "../../mappers/items";
import { getPhotoFileDataFromBase64 } from "../files/getPhotoFileDataFromBase64";
import { uploadFileToGoogle } from "../files/uploadFileToGoogle";

export default async (requestItem: IItem, companyId: number) => {
  const client = await pool.connect();

  try {
    const createdItem = (
      await client.query(
        `INSERT INTO items (company, c, s, n, p, d, i, a, h, v, o, t, vt, ot) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING *`,
        [
          companyId,
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
        ]
      )
    )?.rows?.[0] as IItem | undefined;

    if (!!requestItem?.f) {
      const { file, name } = getPhotoFileDataFromBase64(requestItem?.f);
      await uploadFileToGoogle(file, name);
      await client.query(`UPDATE items SET f = $1 WHERE id = $2`, [name, createdItem?.id]);
    }
  } finally {
    client.release();
  }
};
