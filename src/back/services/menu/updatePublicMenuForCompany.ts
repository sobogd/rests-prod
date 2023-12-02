import pool from "../../db";
import { EPositionStatuses, IPosition, mapPositionsFromDB } from "../../mappers/positions";
import { IPublicMenuCategory } from "../../controllers/menu";
import { mapPositionsCategoriesFromDB } from "../../mappers/positionsCategories";
import { mapPositionsAdditionalFromDB } from "../../mappers/positionsAdditional";
import { mapPositionsI18nFromDB } from "../../mappers/positionsI18n";

export const updatePublicMenuForCompany = async (companyId: number): Promise<void> => {
  const client = await pool.connect();

  const { rows: positionsDB } = await client.query(
    `SELECT id, name, file_name, price, multiple_choice FROM positions WHERE company_id = $1 AND status = $2 AND is_additional = false AND hide = false ORDER BY sort ASC`,
    [companyId, EPositionStatuses.ACTIVE]
  );

  const positions = mapPositionsFromDB(positionsDB);

  if (!positions?.length) {
    return;
  }

  const positionsIds: number[] = positions.map((p) => p.id || 0);

  const { rows: positionsCategoriesDB } = await client.query(
    `
        SELECT * FROM positions_categories 
        WHERE position_id in(${positionsIds.join(",")})
    `
  );

  const positionsCategories = mapPositionsCategoriesFromDB(positionsCategoriesDB);

  const categoriesIds: number[] = positionsCategories?.map((pc) => pc.categoryId || 0);

  if (!categoriesIds?.length) {
    return;
  }

  const { rows: categoriesDB } = await client.query(
    `
        SELECT * FROM categories 
        WHERE id in(${categoriesIds.join(",")})
    `
  );

  const categories = categoriesDB;

  const { rows: positionsAdditionalDB } = await client.query(
    `
        SELECT * FROM positions_additional 
        WHERE general_position_id in(${positionsIds.join(",")})
    `
  );

  const positionsAdditional = mapPositionsAdditionalFromDB(positionsAdditionalDB);

  const positionsAdditionalIds: number[] =
    positionsAdditional?.map((pa) => pa.additionalPositionId || 0) || [];

  let additional: IPosition[] = [];

  if (positionsAdditionalIds?.length) {
    const { rows: additionalDB } = await client.query(
      `SELECT id, name, price FROM positions WHERE id in(${positionsAdditionalIds.join(
        ","
      )}) AND status = $1 AND is_additional = true AND hide = false ORDER BY sort ASC`,
      [EPositionStatuses.ACTIVE]
    );

    additional = mapPositionsFromDB(additionalDB);
  }

  const commonPositionsIds = [...positionsIds, ...positionsAdditionalIds];

  const { rows: translationsDB } = await client.query(
    `
        SELECT * FROM positions_i18n 
        WHERE position_id in(${commonPositionsIds.join(",")})
    `
  );

  const translations = mapPositionsI18nFromDB(translationsDB);

  const result: IPublicMenuCategory[] = categories.map((c) => ({
    id: c.id || 0,
    name: c.name || "",
    t: [],
    items: positionsCategories
      .filter((pc) => pc.categoryId === c.id)
      .map((pc) => {
        const position = positions?.find((p) => p.id === pc.positionId);
        return {
          id: position?.id || 0,
          name: position?.name || "",
          price: position?.price || 0,
          multipleChoice: position?.multipleChoice || true,
          photo: position?.fileName
            ? "https://storage.googleapis.com/rests-files/" + position?.fileName
            : undefined,
          t: translations
            ?.filter((t) => t.positionId === position?.id)
            .map((t) => ({ code: t.code, title: t.title })),
          add: positionsAdditional
            ?.filter((pa) => pa.generalPositionId === position?.id)
            .map((pa) => {
              const addition = additional.find((a) => a.id === pa.additionalPositionId);
              return {
                id: addition?.id || 0,
                name: addition?.name || "",
                price: addition?.price || 0,
                t: translations
                  ?.filter((t) => t.positionId === addition?.id)
                  .map((t) => ({ code: t.code, title: t.title })),
              };
            }),
        };
      }),
  }));

  const jsonResult = JSON.stringify(result);

  await client.query(`DELETE FROM menus WHERE company_id = $1`, [companyId]);

  await client.query(`INSERT INTO menus (menu, company_id) VALUES ($1, $2)`, [jsonResult, companyId]);

  await client.release();
};
