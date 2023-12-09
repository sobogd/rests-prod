import { createContext, useContext, useEffect, useState } from "react";
import { useAuthByCompanyLoginAndPasswordMutation, useAuthByHashMutation, useLazyWhoamiQuery } from "./api";
import Loading from "../loading";
import { IWhoAmI } from "../../../back/types";
import { useTranslation } from "react-i18next";
import { Notice } from "../../hooks/useNotification";
import { EPages } from "../Menu/Menu";

export const getDefaultPageByRole = (role: string): EPages => {
  switch (role) {
    case "kitchen":
      return EPages.KITCHEN;
    case "admin":
      return EPages.DAY_STATS;
    default:
      return EPages.ORDERS;
  }
};

const authContext = createContext({});

export function AuthProvider({ children }: { children: any }) {
  const auth = useProvideAuth();

  return (
    <authContext.Provider value={auth}>
      {auth.loading ? <Loading isLoading={auth.loading} /> : children}
    </authContext.Provider>
  );
}

export const useAuth = (): {
  whoami: IWhoAmI;
  login: ({ login, password }: { login?: string; password?: string }) => void;
  logout: () => void;
  activePage: EPages;
  setActivePage: (page: EPages) => void;
} => {
  // @ts-expect-error
  return useContext(authContext);
};

function useProvideAuth() {
  const [activePage, setActivePage] = useState<EPages>(EPages.LOGIN);

  const [whoami, { data: whoamiData, isFetching, isLoading }] = useLazyWhoamiQuery();

  const [auth, { isLoading: isAuthLoading }] = useAuthByCompanyLoginAndPasswordMutation();
  const [hashAuth, { isLoading: isAuthHashLoading }] = useAuthByHashMutation();

  const { i18n } = useTranslation();

  const logout = () => {
    localStorage.setItem("token", "");
    setActivePage(EPages.LOGIN);
  };

  const login = ({ login, password }: { login?: string; password?: string }) => {
    const hash = localStorage.getItem("loginHash");
    if (login && password) {
      auth({ login, password }).then((res: any) => {
        if (res?.data?.token) {
          Notice.success("Login successfull");
          localStorage.setItem("token", res?.data?.token);
          localStorage.setItem("loginHash", res?.data?.loginHash);
          localStorage.setItem("loginUserName", res?.data?.name);
          whoami().then((res) => {
            if (!!res?.data?.company?.id) {
              setActivePage(getDefaultPageByRole(res?.data?.user?.type));
            }
          });
        }
      });
    } else if (hash !== null) {
      hashAuth(hash ?? "").then((res: any) => {
        if (res?.data?.token) {
          Notice.success("Login successfull");
          localStorage.setItem("token", res?.data?.token);
          localStorage.setItem("loginHash", res?.data?.loginHash);
          localStorage.setItem("loginUserName", res?.data?.name);
          whoami().then((res) => {
            if (!!res?.data?.company?.id) {
              setActivePage(getDefaultPageByRole(res?.data?.user?.type));
            }
          });
        }
      });
    } else {
      Notice.warning("Wrong login or password");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      whoami();
    }
  }, []);

  useEffect(() => {
    if (whoamiData?.user?.type) {
      const newActivePage = getDefaultPageByRole(whoamiData?.user?.type);
      if (newActivePage !== activePage) setActivePage(newActivePage);
    }
  }, [whoamiData]);

  useEffect(() => {
    if (whoamiData?.company?.lang) {
      i18n.changeLanguage(whoamiData?.company?.lang);
    }
  }, [whoamiData]);

  return {
    whoami: whoamiData,
    loading: isFetching || isLoading || isAuthLoading || isAuthHashLoading,
    login,
    logout,
    activePage,
    setActivePage,
  };
}
