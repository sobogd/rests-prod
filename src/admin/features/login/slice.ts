import { createSlice } from "@reduxjs/toolkit";
import { ELoginTabs } from "./enums";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    tab: ELoginTabs.LOGIN,
  } as {
    tab: ELoginTabs;
  },
  reducers: {
    setTab: (state, { payload }) => {
      state.tab = payload;
    },
  },
});

export const loginActions = loginSlice.actions;
export const loginReducer = loginSlice.reducer;
