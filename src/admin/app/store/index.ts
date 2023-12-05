import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { billingReducer } from "../../slices/billing";
import { API } from "../../api";
import { usersModel } from "../../entities/users";
import { tablesReducer } from "../../features/map/slice";

export const store = configureStore({
  reducer: {
    tables: tablesReducer,
    users: usersModel.reducer,
    billing: billingReducer,
    [API.reducerPath]: API.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(API.middleware),
});

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type RootState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);
