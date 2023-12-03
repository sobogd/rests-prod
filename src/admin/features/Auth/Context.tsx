import { createContext, useContext } from "react";
import { useWhoamiQuery } from "./api";
import Loading from "../../shared/loading";
import { IWhoAmI } from "../../../back/types";

const authContext = createContext({});

export function AuthProvider({ children }: { children: any }) {
  const auth = useProvideAuth();

  return (
    <authContext.Provider value={auth}>
      {auth.loading ? <Loading isLoading={auth.loading} /> : children}
    </authContext.Provider>
  );
}

export const useAuth = (): { whoami: IWhoAmI } => {
  // @ts-expect-error
  return useContext(authContext);
};

function useProvideAuth() {
  const { data: whoami, isFetching, isLoading } = useWhoamiQuery();

  return {
    whoami,
    authorized: true,
    loading: isFetching || isLoading,
    logout: 2,
    login: 2,
  };
}
