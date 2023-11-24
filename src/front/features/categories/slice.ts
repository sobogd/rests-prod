import { createSlice } from "@reduxjs/toolkit";
import { ICategory } from "./types";
import { ECategoriesTabs } from "./enums";
import { categoriesService } from "../../api";

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    items: [],
    isLoading: false,
    tab: ECategoriesTabs.LIST,
    categoryId: undefined,
  } as {
    items: ICategory[];
    isLoading: boolean;
    tab: ECategoriesTabs;
    categoryId?: number;
  },
  reducers: {
    setTab: (state, { payload }) => {
      state.tab = payload;
    },
    setCategoryId: (state, { payload }) => {
      state.categoryId = payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(categoriesService.searchCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(categoriesService.searchCategories.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(categoriesService.searchCategories.fulfilled, (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
    });
  },
});

export const reducer = categoriesSlice.reducer;
export const categoriesActions = categoriesSlice.actions;
