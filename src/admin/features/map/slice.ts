import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CTablesInitialState } from "./consts";
import { ITable } from "./types";
import { archiveTable, createTable, searchTables, updateTable } from "./api";

export const tablesSlice = createSlice({
  name: "tables",
  initialState: CTablesInitialState,
  reducers: {
    closeEditItem: (state) => {
      state.form = undefined;
      state.isOpenForm = false;
    },
    startEditItem: (state, { payload }: PayloadAction<ITable | undefined>) => {
      state.form = payload;
      state.isOpenForm = true;
    },
  },
  extraReducers(builder) {
    builder.addCase(searchTables.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(searchTables.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(searchTables.fulfilled, (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
      state.isOpenForm = false;
    });

    builder.addCase(createTable.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createTable.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(createTable.fulfilled, (state) => {
      state.isLoading = false;
      state.form = CTablesInitialState.form;
      state.isOpenForm = false;
    });

    builder.addCase(updateTable.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateTable.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(updateTable.fulfilled, (state) => {
      state.form = CTablesInitialState.form;
      state.isLoading = false;
      state.isOpenForm = false;
    });

    builder.addCase(archiveTable.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(archiveTable.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(archiveTable.fulfilled, (state) => {
      state.form = CTablesInitialState.form;
      state.isLoading = false;
      state.isOpenForm = false;
    });
  },
});

export const tablesReducer = tablesSlice.reducer;
