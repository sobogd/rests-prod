import { ECompanyStatuses } from "./mappers/comapnies";
import { IRate } from "./mappers/rates";

export interface IResponseStatusWithMessage {
  isSuccess: boolean;
  message?: string;
}

export type IAuthRequest = {
  user: {
    id: number;
    companyId: number;
  };
};

export interface IItem {
  id?: number;
  company?: number;
  cat?: number;
  c?: number | string;
  s?: number;
  n?: string;
  p?: number;
  d?: string;
  i?: string;
  a?: boolean;
  h?: boolean;
  v?: {
    n?: string;
    p?: number;
  }[];
  o?: {
    n?: string;
    p?: number;
  }[];
  t?: {
    l?: string;
    t?: string;
    n?: string;
  }[];
  vt?: {
    l?: string;
    t?: string;
    n?: string;
  }[][];
  ot?: {
    l?: string;
    t?: string;
    n?: string;
  }[][];
  f?: string;
  fChanged?: boolean;
}

export interface ICategory {
  id?: number;
  name: string;
  description?: string;
  company_id?: number;
  sort?: number;
  translations?: {
    l?: string;
    t?: string;
    n?: string;
  }[];
}

export interface ICompany {
  id: number;
  title: string;
  tin: string;
  login: string;
  email: string;
  currencySymbol?: string;
  currency_symbol?: string;
  timezone?: string;
  lang: string;
  utcDiff?: number;
  balance?: number;
  status?: ECompanyStatuses;
  rateId?: number;
  created?: string;
  nextPayment?: string;
  perMonth?: number;
  rate?: IRate;
  langs?: string[];
}

export interface IWhoAmI {
  company: {
    id: string;
    title: string;
    email: string;
    symbol: string;
    lang: string;
    langs?: string[];
  };
  user: {
    id: string;
    name: string;
    type: string;
    login: string;
  };
}
