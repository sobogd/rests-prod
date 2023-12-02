import pool from "../../db";
import { IItem } from "../../types";

export default async (companyId: number): Promise<{ c: string; i: IItem[] }[]> => {
  const client = await pool.connect();

  try {
    const items = (
      await client.query(
        `SELECT categories.sort, categories.name as "cname", items.c, items.n, items.p, items.v, items.o, items.vt, items.ot, items.t FROM items LEFT JOIN categories ON categories.id = items.c WHERE items.company = $1 AND items.a = TRUE ORDER BY categories.sort, items.s ASC`,
        [companyId]
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

    const itemsGroupedByCategory = (Object.values(objectItems) as IItem[][]).map((itemArray) => ({
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
        })) ?? [],
    }));

    return itemsGroupedByCategory ?? [];
  } finally {
    client.release();
  }
};
