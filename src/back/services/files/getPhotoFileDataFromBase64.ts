import crypto from "crypto";

export const getPhotoFileDataFromBase64 = (file: string): { file: Buffer; name: string } => {
  const fileArray = file?.split(";base64,");
  const base64Data = fileArray.pop() as string;
  const mimeType = fileArray.shift() as string;
  let ext = "jpg";
  if (mimeType === "data:image/jpeg") ext = "jpeg";
  if (mimeType === "data:image/png") ext = "png";
  return {
    file: new Buffer(base64Data, "base64"),
    name: `${crypto.randomBytes(20).toString("hex")}.${ext}`,
  };
};
