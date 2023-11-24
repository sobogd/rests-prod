import { createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "./base";
import { EUserType } from "../entities/users";

interface IUserCreateOrEditRequest {
  id?: number;
  name: string;
  login: string;
  type: EUserType;
  newPassword?: string;
}

export const getUsersForCompany = createAsyncThunk(
  "users/getUsersForCompany",
  async (_r) => await request("/users/get-users-for-company", "GET")
);

export const updateUserData = createAsyncThunk(
  "users/updateUserData",
  async (data: IUserCreateOrEditRequest) =>
    await request("/users/update-users-data", "POST", data)
);

export const createNewUser = createAsyncThunk(
  "users/createNewUser",
  async (data: IUserCreateOrEditRequest) =>
    await request("/users/create-new-users", "POST", data)
);

export const removeUser = createAsyncThunk(
  "users/removeUser",
  async (userId: number) =>
    await request("/users/remove-users", "POST", {
      userId,
    })
);
