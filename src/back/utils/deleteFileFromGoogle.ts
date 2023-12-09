import { storage } from "../config";

export default async (name: string): Promise<void> => {
  await storage.bucket("rests-files").file(name).delete();
};
