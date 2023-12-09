import { Post, Request, Response, Route, Security } from "tsoa";
import type { IAuthRequest, IMethod } from "../types";
import pool from "../db";

@Route("methods")
export class MethodsController {
  @Response(500, "Response with error")
  @Response(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("")
  public async methods(@Request() auth: IAuthRequest): Promise<IMethod[]> {
    const client = await pool.connect();

    try {
      const discounts =
        (
          await client.query("SELECT id, title, description FROM payment_methods WHERE company_id = $1", [
            auth.user.companyId,
          ])
        )?.rows ?? [];

      return discounts;
    } finally {
      client.release();
    }
  }
}
