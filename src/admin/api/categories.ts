import { createAsyncThunk } from "@reduxjs/toolkit";
import { IErrorResponse, request } from "./base";
import { ICategory } from "../features/categories/types";

export const searchCategories = createAsyncThunk<
  ICategory[],
  void,
  IErrorResponse
>(
  "categories/search",
  async (_) => await request("/categories/search", "POST")
);
