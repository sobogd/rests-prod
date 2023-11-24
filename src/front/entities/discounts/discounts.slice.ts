import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDiscount, IDiscountsState } from "./discounts.types";
import { searchDiscounts } from "./discounts.api";

const initialState: IDiscountsState = {
  discounts: [],
  isLoading: false,
};

export const discountsSlice = createSlice({
  name: "discounts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(searchDiscounts.pending, (state: IDiscountsState) => {
      state.isLoading = true;
    });
    builder.addCase(searchDiscounts.rejected, (state: IDiscountsState) => {
      state.isLoading = false;
    });
    builder.addCase(
      searchDiscounts.fulfilled,
      (state: IDiscountsState, { payload }: PayloadAction<IDiscount[]>) => {
        state.discounts = payload;
        state.isLoading = false;
      }
    );
  },
});
