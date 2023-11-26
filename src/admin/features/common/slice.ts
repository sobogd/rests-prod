import { createSlice } from "@reduxjs/toolkit";
import { EPages } from "./enums";
import { IUser } from "../../entities/users";

export const getDefaultPageByRole = (role: string): EPages => {
  switch (role) {
    case "kitchen":
      return EPages.KITCHEN;
    case "admin":
      return EPages.DAY_STATS;
    default:
      return EPages.ORDERS;
  }
};

export const commonSlice = createSlice({
  name: "auth",
  initialState: {
    activePage: EPages.AUTHORIZATION,
    isMenuOpen: false,
  } as {
    user?: IUser;
    activePage: EPages;
    userCreds?: string;
    userName?: string;
    isMenuOpen?: boolean;
  },
  reducers: {
    signOut: (state) => {
      state.user = undefined;
      state.activePage = EPages.AUTHORIZATION;
    },
    toggleMenuOpen: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    setLoggedUser: (state, { payload }) => {
      localStorage.setItem("restsTimezone", payload?.company?.timezone ?? "");
      state.user = payload;
      state.activePage = getDefaultPageByRole(payload?.type);
    },
    setActivePage: (state, { payload }) => {
      state.activePage = payload;
    },
    setUserCreds: (state, { payload }) => {
      state.userCreds = payload.creds;
      state.userName = payload.name;
    },
  },
});

export const commonActions = commonSlice.actions;
export const commonReducer = commonSlice.reducer;
