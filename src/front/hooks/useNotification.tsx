import { FC } from "react";
import { ProviderContext, useSnackbar } from "notistack";

let snackBar: ProviderContext;
let prevMsg: string;

export const Notifications: FC = () => {
  snackBar = useSnackbar();
  return null;
};

export const Notice = {
  success(msg: string) {
    if (prevMsg !== msg) {
      prevMsg = msg;
      setTimeout(() => {
        prevMsg = "";
      }, 1500);
      snackBar.enqueueSnackbar(msg, {
        variant: "success",
        autoHideDuration: 3000,
      });
    }
  },
  warning(msg: string) {
    if (prevMsg !== msg) {
      prevMsg = msg;
      setTimeout(() => {
        prevMsg = "";
      }, 1500);
      snackBar.enqueueSnackbar(msg, {
        variant: "warning",
        autoHideDuration: 3000,
      });
    }
  },
  error(msg = "") {
    if (prevMsg !== msg) {
      prevMsg = msg;
      setTimeout(() => {
        prevMsg = "";
      }, 700);
      snackBar.enqueueSnackbar(msg, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  },
};
