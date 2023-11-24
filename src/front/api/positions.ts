import { createAsyncThunk } from "@reduxjs/toolkit";
import { IErrorResponse, request } from "./base";
import { IPosition } from "../features/positions/types";

export const searchPositions = createAsyncThunk<
  IPosition[],
  void,
  IErrorResponse
>("positions/search", async (_) => await request("/positions/search", "POST"));
