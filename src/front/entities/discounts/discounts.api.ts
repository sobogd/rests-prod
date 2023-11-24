import { createAsyncThunk } from "@reduxjs/toolkit";
import { IErrorResponse, request } from "../../api/base";
import { IDiscount } from "./discounts.types";

export const searchDiscounts = createAsyncThunk<
  IDiscount[],
  void,
  IErrorResponse
>("discounts/search", async (_) => await request("/discounts/search", "POST"));
