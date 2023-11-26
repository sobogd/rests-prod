import { createAsyncThunk } from "@reduxjs/toolkit";
import { IErrorResponse, request } from "./base";
import { IElement } from "../entities/element/model";

export const searchElements = createAsyncThunk<IElement[], void, IErrorResponse>(
  "elements/search",
  async (_) => await request("/elements/search", "POST")
);

export const createElement = createAsyncThunk<IElement, IElement, IErrorResponse>(
  "elements/create",
  async (element) =>
    await request("/elements/create", "POST", {
      ...element,
      id: undefined,
    })
);

export const updateElement = createAsyncThunk<IElement, IElement, IErrorResponse>(
  "elements/update",
  async (element: IElement) => await request("/elements/update", "POST", element)
);

export const removeElement = createAsyncThunk<{}, IElement, IErrorResponse>(
  "elements/remove",
  async (element: IElement) => await request("/elements/remove", "POST", element)
);
