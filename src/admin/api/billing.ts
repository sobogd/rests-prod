import { createAsyncThunk } from "@reduxjs/toolkit";
import { IErrorResponse, request } from "./base";
import { ICompany } from "../entities/companies/model";
import { IPayment } from "../slices/billing";

const updateCompanyInfo = createAsyncThunk<ICompany, void, IErrorResponse>(
  "billing/updateCompanyInfo",
  async () => await request("/billing/update-company-info", "POST")
);

const makePayment = createAsyncThunk<{ token: string }, { amount: number }, IErrorResponse>(
  "billing/makePayment",
  async (data) => await request("/billing/make-payment", "POST", data)
);

const paymentList = createAsyncThunk<IPayment[], void, IErrorResponse>(
  "billing/paymentList",
  async (data) => await request("/billing/payments-list", "POST")
);

export const billingApi = {
  updateCompanyInfo,
  makePayment,
  paymentList,
};
