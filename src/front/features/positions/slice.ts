import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPosition } from "./types";
import { EPositionsTabs } from "./enums";
import { searchPositions } from "../../api";

export const positionsSlice = createSlice({
  name: "positions",
  initialState: {
    tab: EPositionsTabs.CATEGORIES,
    prevTab: undefined,
    categoryId: undefined,
    positionId: undefined,
    copyPositionId: undefined,
    items: [],
    openedPosition: undefined,
    isLoading: false,
    isOpenForm: false,
    isOpenYouSure: false,
    error: "",
  } as {
    tab: EPositionsTabs;
    prevTab?: EPositionsTabs;
    categoryId?: number;
    positionId?: number;
    copyPositionId?: number;
    items: IPosition[];
    openedPosition?: IPosition;
    isLoading: boolean;
    isOpenForm: boolean;
    isOpenYouSure: boolean;
    error: string;
  },
  reducers: {
    setTab: (state, { payload }) => {
      state.tab = payload;
    },
    setCategoryId: (state, { payload }) => {
      state.categoryId = payload;
    },
    setPositionId: (state, { payload }) => {
      state.positionId = payload;
    },
    setCopyPositionId: (state, { payload }) => {
      state.copyPositionId = payload;
    },
    toggleIsOpenForm: (state) => {
      if (!!state.isOpenForm) {
        state.openedPosition = undefined;
      }
      state.isOpenForm = !state.isOpenForm;
      state.error = "";
    },
    toggleIsOpenYouSure: (state) => {
      state.isOpenYouSure = !state.isOpenYouSure;
      state.error = "";
    },
    startEditItem: (state, { payload }: PayloadAction<IPosition>) => {
      state.openedPosition = payload;
      state.isOpenForm = true;
    },
  },
  extraReducers(builder) {
    builder.addCase(searchPositions.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(searchPositions.rejected, (state) => {
      state.isLoading = false;
      state.error = "Error with request";
    });
    builder.addCase(searchPositions.fulfilled, (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
    });
  },
});

export const positionsActions = positionsSlice.actions;
export const positionsReducer = positionsSlice.reducer;
