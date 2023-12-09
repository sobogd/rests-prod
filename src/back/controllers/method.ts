import { Body, Post, Request, Response, Route, Security } from "tsoa";
import type { IAuthRequest, IMethod } from "../types";
import pool from "../db";

@Route("method")
export class MethodController {
  @Response(500, "Response with error")
  @Response(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("")
  public async method(@Body() { id }: { id: number }, @Request() auth: IAuthRequest): Promise<IMethod> {
    const client = await pool.connect();

    try {
      const discount = (
        await client.query(
          "SELECT id, title, description FROM payment_methods WHERE company_id = $1 AND id = $2 LIMIT 1",
          [auth.user.companyId, id]
        )
      )?.rows?.[0];

      if (!discount) {
        throw new Error("Method not found");
      }

      return discount;
    } finally {
      client.release();
    }
  }
}
