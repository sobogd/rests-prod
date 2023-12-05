import { FC } from "react";
import { ProviderContext, useSnackbar } from "notistack";

let snackBar: ProviderContext;

export const Notifications: FC = () => {
  snackBar = useSnackbar();
  return null;
};

export const Notice = {
  success(msg: string) {
    snackBar?.enqueueSnackbar(msg, {
      variant: "success",
      autoHideDuration: 1000,
    });
  },
  warning(msg: string) {
    snackBar?.enqueueSnackbar(msg, {
      variant: "warning",
      autoHideDuration: 1000,
    });
  },
  error(msg = "") {
    snackBar?.enqueueSnackbar(msg, {
      variant: "error",
      autoHideDuration: 1000,
    });
  },
};
