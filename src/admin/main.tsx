import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { store } from "./app/store";
import { theme } from "./app/styles";
import App from "./app";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { AuthProvider } from "./features/Auth/Context";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <I18nextProvider i18n={i18n}>
            <CssBaseline />
            <App />
          </I18nextProvider>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  </Provider>
);
