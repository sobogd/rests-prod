import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';

import { IWhoAmI } from '../../back/types';
import { API } from '../api';
import { Loading } from '../components/Loading';
import { Login } from '../components/Login';
import { TPermissions } from '../components/Menu';
import { EPages, TPages } from '../components/Page';

export const getDefaultPageByRole = (role: string): EPages => {
  switch (role) {
    case 'kitchen':
      return EPages.KITCHEN;
    case 'admin':
      return EPages.STATS;
    default:
      return EPages.ORDERS;
  }
};

const AuthContext = createContext({});

export function AuthProvider(props: PropsWithChildren) {
  const { children } = props;

  const [activePage, setActivePage] = useState<EPages>(EPages.LOGIN);

  const [whoami, { data: whoamiData, isFetching, isLoading }] =
    API.useLazyWhoamiQuery();

  const { i18n } = useTranslation();

  useEffect(() => {
    if (localStorage.getItem('restsToken')) {
      whoami();
    }
  }, [whoami]);

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
    if (whoamiData?.company?.timezone) {
      localStorage.setItem('restsTimezone', whoamiData?.company?.timezone);
    }
  }, [i18n, whoamiData]);

  const contextValue = useMemo(
    () => ({
      whoami: whoamiData,
      loading: false,
      activePage,
      setActivePage,
      userType: whoamiData?.user?.type ?? 'personal',
      currencySymbol: whoamiData?.company?.symbol,
    }),
    [whoamiData, activePage, setActivePage],
  );

  const afterSuccessLogin = (name: string, hash: string, token: string) => {
    localStorage.setItem('restsToken', token);
    localStorage.setItem('restsLoginHash', hash);
    localStorage.setItem('restsLoginUserName', name);
    whoami().then((res) => {
      if (res?.data?.company?.id) {
        setActivePage(getDefaultPageByRole(res?.data?.user?.type));
      }
    });
  };

  if (isFetching || isLoading) {
    return <Loading isFullscreen isLoading />;
  }

  if (localStorage.getItem('restsToken') === null || !whoamiData?.user?.type) {
    return <Login afterSuccessLogin={afterSuccessLogin} />;
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

type UseAuthProps = {
  whoami: IWhoAmI;
  activePage: TPages;
  setActivePage: (page: TPages) => void;
  userType: TPermissions;
  currencySymbol: string;
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const useAuth = (): UseAuthProps => useContext(AuthContext);
