import { Body, OperationId, Request, Post, Route, Security, Tags, Response } from "tsoa";
import { ErrorResponse } from "./users";
import type { IAuthRequest, ICompany } from "../types";
import updateCompanyInfo from "../services/billing/updateCompanyInfo";
import makePayment from "../services/billing/makePayment";
import express from "express";
import paymentResult from "../services/billing/paymentResult";
import type { IPayment } from "../mappers/payments";
import paymentsList from "../services/billing/paymentsList";
import { makeMonthlyPaymentAndUpdateCompany } from "../services/billing/makeMonthlyPaymentAndUpdateCompany";

@Route("billing")
export class BillingController {
  @Tags("BillingService")
  @OperationId("UpdateCompanyInfo")
  @Response<ErrorResponse>(500, "Response with error")
  @Response<ErrorResponse>(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("update-company-info")
  public async updateCompanyInfo(@Request() { user }: IAuthRequest): Promise<ICompany> {
    return await updateCompanyInfo(user.companyId);
  }
  @Tags("BillingService")
  @OperationId("MakePayment")
  @Response<ErrorResponse>(500, "Response with error")
  @Response<ErrorResponse>(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("make-payment")
  public async makePayment(
    @Body() request: { amount: number },
    @Request() { user }: IAuthRequest
  ): Promise<{ token: string }> {
    return await makePayment(user.companyId, request.amount);
  }
  @Tags("BillingService")
  @OperationId("PaymentsList")
  @Response<ErrorResponse>(500, "Response with error")
  @Response<ErrorResponse>(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("payments-list")
  public async paymentsList(@Request() { user }: IAuthRequest): Promise<IPayment[]> {
    return await paymentsList(user.companyId);
  }
  @Tags("BillingService")
  @OperationId("MakeMonthlyPaymentAndUpdateCompany")
  @Response<ErrorResponse>(500, "Response with error")
  @Post("make-monthly-payment-and-update-company")
  public async makeMonthlyPaymentAndUpdateCompany(@Body() request: { companyId: number }): Promise<boolean> {
    return await makeMonthlyPaymentAndUpdateCompany(request.companyId);
  }
  @Tags("BillingService")
  @OperationId("SuccessPayment")
  @Response<ErrorResponse>(500, "Response with error")
  @Post("success-payment")
  public async successPayment(@Request() req: express.Request): Promise<void> {
    await paymentResult(
      req.body.hash as string,
      Number(req.body.merchant_oid) as number,
      req.body.status as "success" | "failed",
      req.body.total_amount
    );
    req.res?.header("Content-Type", "text/plain; charset=utf-8");
    req.res?.send("OK");
  }
  @Tags("BillingService")
  @OperationId("FailedPayment")
  @Response<ErrorResponse>(500, "Response with error")
  @Post("failed-payment")
  public async failedPayment(@Request() req: express.Request): Promise<void> {
    await paymentResult(
      req.body.hash as string,
      Number(req.body.merchant_oid) as number,
      "failed",
      req.body.total_amount
    );
    req.res?.header("Content-Type", "text/plain; charset=utf-8");
    req.res?.send("OK");
  }
}
