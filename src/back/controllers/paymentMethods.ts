import { OperationId, Post, Request, Response, Route, Security, Tags } from "tsoa";
import * as types from "../types";
import { ErrorResponse } from "./users";
import { IPaymentMethod } from "../mappers/paymentMethods";
import { searchPaymentMethods } from "../services/paymentMethods/searchPaymentMethods";

@Route("paymentMethods")
export class PaymentMethodsController {
  @Tags("PaymentMethodsService")
  @OperationId("Search")
  @Response<ErrorResponse>(500, "Response with error")
  @Response<ErrorResponse>(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("search")
  public async search(@Request() { user }: types.IAuthRequest): Promise<IPaymentMethod[]> {
    return await searchPaymentMethods(user.companyId);
  }
}
