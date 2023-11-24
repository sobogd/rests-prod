import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOrdersHistory, IReport, IReportsState } from "./reports.types";
import {
  createReport,
  getOrdersHistory,
  getReports,
  orderReturn,
} from "./reports.api";

const initialState: IReportsState = {
  isLoading: false,
  isOpenDayReport: false,
  isOpenBetweenReport: false,
  error: "",
  reports: [],
  snackbar: {
    message: "",
    isShow: false,
  },
  ordersHistory: [],
};

export const reportsSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    toggleDayReportModal: (state) => {
      state.isOpenDayReport = !state.isOpenDayReport;
    },
    toggleBetweenReportModal: (state) => {
      state.isOpenBetweenReport = !state.isOpenBetweenReport;
    },
    closeSnackbar: (state) => {
      state.snackbar = initialState.snackbar;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createReport.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createReport.rejected, (state) => {
      state.isLoading = false;
      state.error = "Error with creating report";
    });
    builder.addCase(createReport.fulfilled, (state) => {
      state.isLoading = false;
      state.isOpenDayReport = false;
      state.error = "";
      state.snackbar.isShow = true;
      state.snackbar.message = "Report successfully created";
    });
    builder.addCase(getReports.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getReports.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(
      getReports.fulfilled,
      (state, { payload }: PayloadAction<IReport[]>) => {
        state.isLoading = false;
        state.reports = payload;
      }
    );
    builder.addCase(getOrdersHistory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getOrdersHistory.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(
      getOrdersHistory.fulfilled,
      (state, { payload }: PayloadAction<IOrdersHistory[]>) => {
        state.isLoading = false;
        state.ordersHistory = payload;
      }
    );
    builder.addCase(orderReturn.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(orderReturn.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(orderReturn.fulfilled, (state) => {
      state.isLoading = false;
    });
  },
});

export const { toggleDayReportModal, toggleBetweenReportModal, closeSnackbar } =
  reportsSlice.actions;
