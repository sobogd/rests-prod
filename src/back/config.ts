import { Storage } from "@google-cloud/storage";
import dotenv from "dotenv";

dotenv.config();

export const storage = new Storage({
  projectId: process.env.GCLOUD_SCHEME || "",
  credentials: {
    type: "service_account",
    private_key: process.env.GCLOUD_PRIVATE_KEY?.split(String.raw`\n`).join("\n") || "",
    client_email: process.env.GCLOUD_CLIENT_EMAIL || "",
    client_id: process.env.GCLOUD_CLIENT_ID || "",
    universe_domain: "googleapis.com",
  },
});
