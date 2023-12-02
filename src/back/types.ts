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
