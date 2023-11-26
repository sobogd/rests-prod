import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { searchPaymentMethods } from "./paymentMethods.api";
import { IPaymentMethod, IPaymentMethodsState } from "./paymentMethods.types";

const initialState: IPaymentMethodsState = {
  paymentMethods: [],
  isLoading: false,
};

export const paymentMethodsSlice = createSlice({
  name: "paymentMethods",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      searchPaymentMethods.pending,
      (state: IPaymentMethodsState) => {
        state.isLoading = true;
      }
    );
    builder.addCase(
      searchPaymentMethods.rejected,
      (state: IPaymentMethodsState) => {
        state.isLoading = false;
      }
    );
    builder.addCase(
      searchPaymentMethods.fulfilled,
      (
        state: IPaymentMethodsState,
        { payload }: PayloadAction<IPaymentMethod[]>
      ) => {
        state.paymentMethods = payload;
        state.isLoading = false;
      }
    );
  },
});
