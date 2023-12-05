import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { store } from "./app/store";
import { theme } from "./app/styles";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { AuthProvider, useAuth } from "./features/Auth/Context";
import { SnackbarProvider } from "notistack";
import { Notifications } from "./hooks/useNotification";
import { CMenuItems } from "./menu";
import { FC } from "react";

const Page: FC = () => {
  const { activePage } = useAuth();
  return CMenuItems.find((i) => i.id === activePage)?.component ?? null;
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      hideIconVariant
      autoHideDuration={1000}
    >
      <I18nextProvider i18n={i18n}>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <Notifications />
            <CssBaseline />
            <Page />
          </ThemeProvider>
        </AuthProvider>
      </I18nextProvider>
    </SnackbarProvider>
  </Provider>
);
