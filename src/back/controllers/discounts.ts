import { OperationId, Post, Request, Response, Route, Security, Tags } from "tsoa";
import type { IAuthRequest } from "../types";
import { ErrorResponse } from "./users";
import { searchDiscounts } from "../services/discounts/searchDiscounts";
import { IDiscount } from "../mappers/discounts";

@Route("discounts")
export class DiscountsController {
  @Tags("DiscountsService")
  @OperationId("Search")
  @Response<ErrorResponse>(500, "Response with error")
  @Response<ErrorResponse>(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("search")
  public async search(@Request() { user }: IAuthRequest): Promise<IDiscount[]> {
    return await searchDiscounts(user.companyId);
  }
}
