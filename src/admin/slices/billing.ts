import { createSlice } from "@reduxjs/toolkit";
import { billingApi } from "../api/billing";
import { ICompany } from "../../back/types";

export enum EPaymentTypes {
  DEPOSIT = "deposit",
  WITHDRAW = "withdraw",
}

export enum EPaymentStatuses {
  NEW = "new",
  PAID = "paid",
  ERROR = "error",
}

export interface IPayment {
  id: number;
  date: string;
  status: EPaymentStatuses;
  amount: number;
  companyId: number;
  type: EPaymentTypes;
}

export interface IBillingState {
  isLoading: boolean;
  isOpenMakePayment: boolean;
  token?: string;
  company?: ICompany;
  items: IPayment[];
}

const initialState: IBillingState = {
  isLoading: false,
  isOpenMakePayment: false,
  items: [],
};

export const billingSlice = createSlice({
  name: "billing",
  initialState,
  reducers: {
    openMakePayment: (state) => {
      state.isOpenMakePayment = true;
    },
    closeMakePayment: (state) => {
      state.isOpenMakePayment = false;
      state.token = undefined;
    },
  },
  extraReducers(builder) {
    builder.addCase(billingApi.updateCompanyInfo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(billingApi.updateCompanyInfo.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(billingApi.updateCompanyInfo.fulfilled, (state, { payload }) => {
      state.company = payload;
      state.isLoading = false;
    });
    builder.addCase(billingApi.makePayment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(billingApi.makePayment.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(billingApi.makePayment.fulfilled, (state, { payload }) => {
      state.token = payload.token;
      state.isLoading = false;
    });
    builder.addCase(billingApi.paymentList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(billingApi.paymentList.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(billingApi.paymentList.fulfilled, (state, { payload }) => {
      state.items = payload;
      state.isLoading = false;
    });
  },
});

export const billingReducer = billingSlice.reducer;
export const billingActions = billingSlice.actions;
