import pool from "../../db";
import { IPosition, mapPositionsFromDB } from "../../mappers/positions";
import { mapPositionsAdditionalFromDB } from "../../mappers/positionsAdditional";
import { mapPositionsCategoriesFromDB } from "../../mappers/positionsCategories";
import { mapPositionsElementsFromDB } from "../../mappers/positionsElements";
import { mapPositionsI18nFromDB } from "../../mappers/positionsI18n";

export interface IGetPositionDetails extends IPosition {
  additional: number[];
  categories: number[];
  composition: { elementId: number; weight: number }[];
  translations: { code: string; name: string }[];
}

export const getPositionDetails = async (
  positionId: number
): Promise<IGetPositionDetails> => {
  const client = await pool.connect();

  const { rows: positionsDB } = await client.query(
    "SELECT * FROM positions WHERE id = $1 LIMIT 1",
    [positionId]
  );

  const position = mapPositionsFromDB(positionsDB)?.[0];

  if (!position?.id) {
    throw new Error("Error while loading position");
  }

  const result: IGetPositionDetails = {
    ...position,
    additional: [],
    categories: [],
    composition: [],
    translations: [],
  };

  const { rows: positionsAdditionalDB } = await client.query(
    `SELECT * FROM positions_additional WHERE general_position_id = $1`,
    [position.id]
  );

  const positionsAdditional = mapPositionsAdditionalFromDB(
    positionsAdditionalDB
  );

  result.additional =
    positionsAdditional?.map((p) => p.additionalPositionId) || [];

  const { rows: positionsCategoriesDB } = await client.query(
    `SELECT * FROM positions_categories WHERE position_id = $1`,
    [position.id]
  );

  const positionsCategories = mapPositionsCategoriesFromDB(
    positionsCategoriesDB
  );

  result.categories = positionsCategories?.map((p) => p.categoryId) || [];

  const { rows: positionsElementsDB } = await client.query(
    `SELECT * FROM positions_elements WHERE position_id = $1`,
    [position.id]
  );

  const positionsElements = mapPositionsElementsFromDB(positionsElementsDB);

  result.composition =
    positionsElements?.map((p) => ({
      elementId: p.elementId,
      weight: p.weight,
    })) || [];

  const { rows: positionsTranslationsDB } = await client.query(
    `SELECT code, title  FROM positions_i18n WHERE position_id = $1`,
    [position.id]
  );

  const positionsTranslations = mapPositionsI18nFromDB(positionsTranslationsDB);

  result.translations =
    positionsTranslations?.map((t) => ({
      code: t.code,
      name: t.title,
    })) || [];

  await client.release();

  return result;
};
