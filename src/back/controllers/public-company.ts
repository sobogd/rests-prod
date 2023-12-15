import { Post, Route, Response, Body } from "tsoa";
import type { ICompany, IItem, IPublicResponse } from "../types";
import pool from "../db";

@Route("public-company")
export class PublicCompanyController {
  @Response(500, "Response with error")
  @Post("")
  public async publicCompany(@Body() body: { login: string }): Promise<IPublicResponse> {
    const client = await pool.connect();

    try {
      const company = (await client.query("SELECT * FROM companies WHERE login = $1", [body?.login]))
        ?.rows?.[0];

      if (!company) throw new Error("Company not found");

      const items = (
        await client.query(
          `SELECT categories.sort, categories.name as "cname", items.c, items.n, items.p, items.v, items.f, items.o, items.vt, items.ot, items.t, items.id FROM items LEFT JOIN categories ON categories.id = items.c WHERE items.company = $1 AND items.a = TRUE AND items.h = FALSE ORDER BY categories.sort, items.s ASC`,
          [company.id]
        )
      )?.rows as IItem[] | undefined;

      if (items?.length === undefined) throw new Error("Items not found");

      const objectItems =
        items?.reduce((object: any, item: IItem) => {
          const i = `-${(item as any).sort}-${item.c}-`;
          if (!!item.c && !!object[i]?.length) {
            object[i].push(item);
          }
          if (!!item.c && !object[i]?.length) {
            object[i] = [item];
          }
          return object;
        }, {}) ?? {};

      const categoriesWithPositions =
        (Object.values(objectItems) as IItem[][]).map((itemArray) => ({
          // @ts-ignore
          c: itemArray?.[0]?.cname?.toString() ?? "",
          i:
            itemArray?.map((item) => ({
              ...item,
              c: item.c,
              cname: undefined,
              p: Number(item?.p),
              v: !item?.v?.length ? undefined : item.v,
              o: !item?.o?.length ? undefined : item.o,
              vt: item.vt,
              ot: item.ot,
              t: item.t,
              f: item.f,
            })) ?? [],
        })) ?? [];

      return { ...company, categoriesWithPositions };
    } finally {
      client.release();
    }
  }
}
