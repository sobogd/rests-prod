import pool from "../../db";
import { mapPositionsFromDB } from "../../mappers/positions";
import { IUpdatePositionRequest } from "../../controllers/positions";
import { DateTime } from "luxon";
import { Storage } from "@google-cloud/storage";
import dotenv from "dotenv";

dotenv.config();

const projectId = process.env.GCLOUD_SCHEME || "";
const storage = new Storage({
  projectId,
  credentials: {
    type: "service_account",
    private_key: process.env.GCLOUD_PRIVATE_KEY || "",
    client_email: process.env.GCLOUD_CLIENT_EMAIL || "",
    client_id: process.env.GCLOUD_CLIENT_ID || "",
    universe_domain: "googleapis.com",
  },
});

export const updatePosition = async (
  request: IUpdatePositionRequest,
  companyId: number
) => {
  const client = await pool.connect();

  const { rows: positionsDB } = await client.query(
    `
        SELECT id, file_name FROM positions WHERE id = $1 AND company_id = $2 LIMIT 1
      `,
    [request.id, companyId]
  );

  const existPosition = mapPositionsFromDB(positionsDB)?.[0];

  if (!existPosition?.id) {
    throw new Error("Position not exist for this company");
  }

  let fileName = request?.isFileChanged ? undefined : existPosition?.fileName;

  if (request?.isFileChanged && !!existPosition?.fileName) {
    await storage.bucket("rests-files").file(existPosition.fileName).delete();
    fileName = undefined;
  }

  if (request?.isFileChanged && request?.file) {
    const fileArray = request?.file?.split(";base64,");
    const base64Data = fileArray.pop() as string;
    const mimeType = fileArray.shift() as string;
    let ext = ".jpg";
    if (mimeType === "data:image/jpeg") ext = ".jpeg";
    if (mimeType === "data:image/png") ext = ".png";
    fileName = `${existPosition.id}-${DateTime.now().toMillis()}${ext}`;
    const file = new Buffer(base64Data, "base64");
    await storage.bucket("rests-files").file(fileName).save(file);
  }

  const { rows: updatedPositionsDB } = await client.query(
    `
    UPDATE positions SET name = $1, description = $2, price = $3, is_additional = $4, sort = $5, file_name = $6, hide = $7, multiple_choice = $8   
    WHERE id = $9
    RETURNING *
  `,
    [
      request.name,
      request.description || "",
      request.price || 0,
      request.isAdditional || false,
      request.sort || 500,
      fileName,
      request.hide || false,
      request.multipleChoice,
      request.id,
    ]
  );

  const updatedPosition = mapPositionsFromDB(updatedPositionsDB)?.[0];

  if (!updatedPosition?.id) {
    throw new Error("Error while trying to update position");
  }

  await client.query(
    "DELETE FROM positions_categories WHERE position_id = $1",
    [updatedPosition?.id]
  );

  for (const categoryId of request.categories) {
    await client.query(
      `INSERT INTO positions_categories (position_id, category_id) VALUES ($1, $2)`,
      [updatedPosition.id, categoryId]
    );
  }

  await client.query(
    "DELETE FROM positions_additional WHERE general_position_id = $1",
    [updatedPosition?.id]
  );

  if (!request?.isAdditional) {
    for (const additionalId of request.additional) {
      await client.query(
        `INSERT INTO positions_additional (general_position_id, additional_position_id) VALUES ($1, $2)`,
        [updatedPosition.id, additionalId]
      );
    }
  }

  await client.query("DELETE FROM positions_elements WHERE position_id = $1", [
    updatedPosition?.id,
  ]);

  for (const { elementId, weight } of request.composition) {
    await client.query(
      `INSERT INTO positions_elements (position_id, element_id, weight) VALUES ($1, $2, $3)`,
      [updatedPosition.id, elementId, weight]
    );
  }

  await client.query("DELETE FROM positions_i18n WHERE position_id = $1", [
    updatedPosition?.id,
  ]);

  for (const { code, name } of request.translations) {
    await client.query(
      `INSERT INTO positions_i18n (position_id, code, title) VALUES ($1, $2, $3)`,
      [updatedPosition.id, code, name]
    );
  }

  await client.release();
};
