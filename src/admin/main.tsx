import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { store } from "./store";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { AuthProvider, useAuth } from "./components/Auth/Context";
import { SnackbarProvider } from "notistack";
import { Notifications } from "./hooks/useNotification";
import { FC } from "react";
import { CMenuItems, MenuProvider } from "./components/Menu/Menu";

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
          <Notifications />
          <MenuProvider>
            <Page />
          </MenuProvider>
        </AuthProvider>
      </I18nextProvider>
    </SnackbarProvider>
  </Provider>
);
