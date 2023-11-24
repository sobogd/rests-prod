import pool from "../../db";
import { EPositionStatuses, mapPositionsFromDB } from "../../mappers/positions";
import dotenv from "dotenv";
import { Storage } from "@google-cloud/storage";

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

export const archivePosition = async (positionId: number) => {
  const client = await pool.connect();

  const { rows: positionsDB } = await client.query(
    "UPDATE positions SET status = $1 WHERE id = $2 RETURNING *",
    [EPositionStatuses.ARCHIVED, positionId]
  );

  const fileName = mapPositionsFromDB(positionsDB)?.[0]?.fileName;

  if (fileName) {
    await storage.bucket("rests-files").file(fileName).delete();
    await client.query("UPDATE positions SET file_name = $1 WHERE id = $2", [
      null,
      positionId,
    ]);
  }

  await client.release();
};
