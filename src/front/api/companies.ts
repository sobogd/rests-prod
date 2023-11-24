import { createAsyncThunk } from "@reduxjs/toolkit";
import { IErrorResponse, request } from "./base";

type IChangeCompanyPasswordData = {
  oldPassword: string;
  newPassword: string;
};

export const changeCompanyPassword = createAsyncThunk<
  any,
  IChangeCompanyPasswordData,
  IErrorResponse
>(
  "companyPassword/change",
  async (data) => await request("/companies/changePassword", "POST", data)
);
