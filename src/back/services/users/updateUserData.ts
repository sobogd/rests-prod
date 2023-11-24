import { IResponseStatusWithMessage } from "../../types";
import * as bcrypt from "bcryptjs";
import pool from "../../db";
import { IUserForUpdate } from "../../mappers/users";
import FieldsError from "../../helpers/fieldsError";

const updateUserData = async (
  data: IUserForUpdate
): Promise<IResponseStatusWithMessage> => {
  const client = await pool.connect();

  if (!data.name || !data.id || !data.type || !data.login) {
    throw new FieldsError("Error with request validation");
  }

  const { rows: updatedUserData } = await client.query(
    "UPDATE users SET name = $1, type = $2, login = $3 WHERE id = $4 RETURNING *",
    [data.name, data.type, data.login, data.id]
  );

  if (!updatedUserData.length) {
    throw new FieldsError("Error with update users data");
  }

  if (data.newPassword && data.newPassword.length) {
    const newHash = await bcrypt.hash(data.newPassword, 13);

    const { rows: updatedUserHash } = await client.query(
      "UPDATE users SET password = $1 WHERE id = $2 RETURNING *",
      [newHash, data.id]
    );

    if (!updatedUserHash.length) {
      throw new FieldsError("Error with update users password");
    }
  }

  client.release();

  return { isSuccess: true };
};

export default updateUserData;
