import { createAsyncThunk } from "@reduxjs/toolkit";
import { IErrorResponse, request } from "../../api/base";
import { IPaymentMethod } from "./paymentMethods.types";

export const searchPaymentMethods = createAsyncThunk<
  IPaymentMethod[],
  void,
  IErrorResponse
>(
  "paymentMethods/search",
  async (_) => await request("/paymentMethods/search", "POST")
);
