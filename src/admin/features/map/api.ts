import { createAsyncThunk } from "@reduxjs/toolkit";
import { requestFiles } from "../../utils/requestFiles";
import { IErrorResponse, request } from "../../api/base";
import { ITable, ITableForCreate, ITableImage } from "./types";

export const findImage = createAsyncThunk<ITableImage, void, IErrorResponse>(
  "tables/findImage",
  async (_) => await request("tables/findImage", "POST")
);

export const uploadImage = createAsyncThunk<void, FileList, IErrorResponse>(
  "tables/uploadImage",
  async (files) => {
    return await requestFiles("tables/uploadImage", "POST", files);
  }
);

export const searchTables = createAsyncThunk<ITable[], void, IErrorResponse>(
  "tables/search",
  async (_) => await request("tables/search", "POST")
);

export const createTable = createAsyncThunk<ITableForCreate, ITableForCreate, IErrorResponse>(
  "tables/create",
  async (element) => await request("tables/create", "POST", element)
);

export const updateTable = createAsyncThunk<ITable, ITable, IErrorResponse>(
  "tables/update",
  async (element: ITable) => await request("tables/update", "POST", element)
);

export const archiveTable = createAsyncThunk<{}, ITable, IErrorResponse>(
  "tables/archive",
  async (element: ITable) =>
    await request("tables/archive", "POST", {
      id: element.id,
    })
);
