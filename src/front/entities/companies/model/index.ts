import { createSlice } from "@reduxjs/toolkit";
import { changeCompanyPassword } from "../../../api";

export enum ECompanyStatuses {
  ACTIVE = "active",
  ARCHIVE = "archive",
  UNPAID = "unpaid",
}

export interface IRate {
  id: number;
  name: string;
  perMonth: number;
}

export interface ICompany {
  id: number;
  title: string;
  tin: string;
  login: string;
  email: string;
  currencySymbol: string;
  timezone: string;
  lang: string;
  utcDiff: number;
  balance?: number;
  status?: ECompanyStatuses;
  rateId?: number;
  created?: string;
  nextPayment?: string;
  rate?: IRate;
}

export interface ICategoriesState {
  isLoading: boolean;
  changePasswordForm?: {
    isSuccess: boolean;
    message?: string;
  };
}

const initialState: ICategoriesState = {
  isLoading: false,
  changePasswordForm: undefined,
};

export const companiesModel = createSlice({
  name: "companies",
  initialState,
  reducers: {
    resetChangePasswordForm: (state) => {
      state.changePasswordForm = undefined;
    },
  },
  extraReducers(builder) {
    builder.addCase(changeCompanyPassword.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(changeCompanyPassword.rejected, (state) => {
      state.isLoading = false;
      state.changePasswordForm = {
        isSuccess: false,
        message: "Error with request",
      };
    });
    builder.addCase(changeCompanyPassword.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.changePasswordForm = !payload.isSuccess ? payload : { isSuccess: true };
    });
  },
});

export const reducer = companiesModel.reducer;
