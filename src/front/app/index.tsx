import { FC, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "./store";
import { useLoading } from "../hooks/useLoading";
import { SnackbarProvider } from "notistack";
import { Notifications } from "../hooks/useNotification";
import { useTranslation } from "react-i18next";
import { CPageComponents } from "./consts";
import { categoriesService, searchPositions } from "../api";
import { searchPaymentMethods } from "../entities/paymentMethods";
import { searchTables } from "../features/map/api";
import { commonActions, getDefaultPageByRole } from "../features/common/slice";

const App: FC = () => {
  const dispatch = useAppDispatch();
  const { user, activePage } = useAppSelector((s) => s.common);
  const { i18n } = useTranslation();
  const isLoading = useLoading();

  useEffect(() => {
    if (!!user) {
      dispatch(commonActions.setActivePage(getDefaultPageByRole(user.type)));
    }
  }, []);

  useEffect(() => {
    if (!!user) {
      i18n.changeLanguage("en");
      dispatch(searchTables());
      dispatch(categoriesService.searchCategories());
      dispatch(searchPaymentMethods());
    }
  }, [user]);

  const renderedPage = useMemo(() => {
    if (!!activePage) {
      return CPageComponents[activePage];
    } else {
      return CPageComponents.AUTHORIZATION;
    }
  }, [activePage]);

  return (
    <SnackbarProvider
      maxSnack={1}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      hideIconVariant
      autoHideDuration={1000}
    >
      {renderedPage}
      <Notifications />
    </SnackbarProvider>
  );
};

export default App;
