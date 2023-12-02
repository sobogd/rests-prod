import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { companiesModel } from "../../entities/companies/model";
import { setupListeners } from "@reduxjs/toolkit/query";
import { reportsSlice } from "../../entities/reports";
import { discountsSlice } from "../../entities/discounts";
import { paymentMethodsSlice } from "../../entities/paymentMethods";
import { billingReducer } from "../../slices/billing";
import { CTablesInitialState } from "../../features/map/consts";
import { API } from "../../api";
import { elementModel } from "../../entities/element";
import { usersModel } from "../../entities/users";
import { commonReducer } from "../../features/common/slice";
import { loginReducer } from "../../features/login/slice";
import { tablesReducer } from "../../features/map/slice";

const localState = localStorage?.getItem("restsReduxState");

const preloadedStateUnFiltered = localState ? JSON.parse(localState) : undefined;

const preloadedState = preloadedStateUnFiltered
  ? {
      common: {
        user: preloadedStateUnFiltered.common?.user,
        activePage: preloadedStateUnFiltered.common?.activePage,
        userCreds: preloadedStateUnFiltered.common?.userCreds,
        userName: preloadedStateUnFiltered.common?.userName,
      },
      tables: {
        ...CTablesInitialState,
        items: preloadedStateUnFiltered?.tables?.items ?? [],
      },
    }
  : undefined;

export const store = configureStore({
  reducer: {
    elements: elementModel.reducer,
    tables: tablesReducer,
    users: usersModel.reducer,
    companies: companiesModel.reducer,
    common: commonReducer,
    reports: reportsSlice.reducer,
    discounts: discountsSlice.reducer,
    paymentMethods: paymentMethodsSlice.reducer,
    billing: billingReducer,
    login: loginReducer,
    [API.reducerPath]: API.reducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(API.middleware),
});

store.subscribe(() => {
  localStorage.setItem("restsReduxState", JSON.stringify(store.getState()));
});

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type RootState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);
