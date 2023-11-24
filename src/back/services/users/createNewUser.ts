import { IResponseStatusWithMessage } from "../../types";
import * as bcrypt from "bcryptjs";
import pool from "../../db";
import { EUserStatuses, IUserForCreate } from "../../mappers/users";
import FieldsError from "../../helpers/fieldsError";

const createNewUser = async (
  data: IUserForCreate,
  companyId: number
): Promise<IResponseStatusWithMessage> => {
  const client = await pool.connect();

  if (!data.name || !data.type || !data.login || !data.newPassword) {
    throw new FieldsError("Error with request validation");
  }

  const newHash = await bcrypt.hash(data.newPassword, 13);

  const { rows: createdUser } = await client.query(
    "INSERT INTO users (name, login, password, type, company_id, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [data.name, data.login, newHash, data.type, companyId, EUserStatuses.ACTIVE]
  );

  if (!createdUser.length) {
    throw new FieldsError("Error while adding users");
  }

  client.release();

  return { isSuccess: true };
};

export default createNewUser;
