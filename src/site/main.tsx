import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { store } from "./store";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { FC, useEffect, useMemo } from "react";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import { useLazyCompanyQuery } from "./api";
import { EPages } from "./types";
import { Layout } from "./components/Layout/Layout";
import { Helmet } from "react-helmet";

const Page: FC = () => {
  const params = useParams();
  const [load, { data, isLoading, isFetching }] = useLazyCompanyQuery();

  useEffect(() => {
    if (params?.login && params?.login !== "") {
      load(params.login);
    }
  }, [params?.login]);

  const page = useMemo(() => {
    if (params?.page && params?.page !== "" && data != null && !isLoading && !isFetching) {
      switch (params.page) {
        case EPages.HOME:
          return <Layout page={EPages.MENU} data={data} />;
        case EPages.ABOUT:
          return <Layout page={EPages.MENU} data={data} />;
        case EPages.MENU:
          return <Layout page={EPages.MENU} data={data} />;
        case EPages.CONTACTS:
          return <Layout page={EPages.CONTACTS} data={data} />;
        default:
          return <IncorrectPage />;
      }
    }
    return <IncorrectPage />;
  }, [params?.page, data, isLoading, isFetching]);

  return (
    <>
      <Helmet>
        <title>{data?.title}</title>
      </Helmet>
      {page}
    </>
  );
};

const IncorrectPage: FC = () => {
  return (
    <div className="background">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/site/:login/:page" Component={Page} />
          <Route path="/site/:login" Component={IncorrectPage} />
          <Route path="/site/" Component={IncorrectPage} />
          <Route path="/" Component={IncorrectPage} />
          <Route path="/site/:login/:page/:nothing" Component={IncorrectPage} />
        </Routes>
      </BrowserRouter>
    </I18nextProvider>
  </Provider>
);
