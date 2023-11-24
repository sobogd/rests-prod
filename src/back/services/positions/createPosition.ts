import pool from "../../db";
import { EPositionStatuses, mapPositionsFromDB } from "../../mappers/positions";
import { ICreatePositionRequest } from "../../controllers/positions";
import { getPhotoFileDataFromBase64 } from "../files/getPhotoFileDataFromBase64";
import { uploadFileToGoogle } from "../files/uploadFileToGoogle";

export const createPosition = async (request: ICreatePositionRequest, companyId: number) => {
  const client = await pool.connect();

  const { rows: createdPositionsDB } = await client.query(
    `
    INSERT INTO positions (name, description, price, is_additional, sort, company_id, status, hide, multiple_choice) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
    RETURNING *
  `,
    [
      request.name,
      request.description || null,
      request.price || 0,
      request.isAdditional || false,
      request.sort || 500,
      companyId,
      EPositionStatuses.ACTIVE,
      request.hide || false,
      request.multipleChoice,
    ]
  );

  const createdPosition = mapPositionsFromDB(createdPositionsDB)?.[0];

  if (!createdPosition?.id) {
    throw new Error("Error while creating position");
  }

  if (request?.file) {
    const fileData = getPhotoFileDataFromBase64(request?.file);
    await uploadFileToGoogle(fileData.file, fileData.name);
    await client.query(`UPDATE positions SET file_name = $1 WHERE id = $2 RETURNING *`, [
      fileData.name,
      createdPosition.id,
    ]);
  }

  for (const categoryId of request.categories) {
    await client.query(`INSERT INTO positions_categories (position_id, category_id) VALUES ($1, $2)`, [
      createdPosition.id,
      categoryId,
    ]);
  }

  if (!request?.isAdditional) {
    for (const additionalId of request.additional) {
      await client.query(
        `INSERT INTO positions_additional (general_position_id, additional_position_id) VALUES ($1, $2)`,
        [createdPosition.id, additionalId]
      );
    }
  }

  for (const { elementId, weight } of request.composition) {
    await client.query(
      `INSERT INTO positions_elements (position_id, element_id, weight) VALUES ($1, $2, $3)`,
      [createdPosition.id, elementId, weight]
    );
  }

  for (const { code, name } of request.translations) {
    await client.query(`INSERT INTO positions_i18n (position_id, code, title) VALUES ($1, $2, $3)`, [
      createdPosition.id,
      code,
      name,
    ]);
  }

  await client.release();
};
