import { createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "../../api/base";
import { IErrorWithFields } from "../../app/interfaces";
import { IOrdersHistory, IReport, IReportForCreate } from "./reports.types";

export const createReport = createAsyncThunk<
  {},
  IReportForCreate,
  { rejectValue: IErrorWithFields }
>(
  "reports/createReport",
  async (report) => await request("/reports/create", "POST", report)
);

export const getReports = createAsyncThunk<
  IReport[],
  void,
  { rejectValue: IErrorWithFields }
>("reports/search", async (_) => await request("/reports/search", "POST"));

export const getOrdersHistory = createAsyncThunk<
  IOrdersHistory[],
  { workDay: string },
  { rejectValue: IErrorWithFields }
>(
  "reports/getOrdersHistory",
  async ({ workDay }) =>
    await request("/reports/getOrdersHistory", "POST", {
      date: workDay,
    })
);

export const orderReturn = createAsyncThunk<
  {},
  { id: number },
  { rejectValue: IErrorWithFields }
>(
  "reports/orderReturn",
  async ({ id }) =>
    await request("/orders/return", "POST", {
      id,
    })
);
