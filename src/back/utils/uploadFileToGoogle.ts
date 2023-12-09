import { storage } from "../config";

export const uploadFileToGoogle = async (file: Buffer, name: string): Promise<void> => {
  await storage.bucket("rests-files").file(name).save(file);
};
