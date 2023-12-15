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

export enum EUserTypes {
  ADMIN = "admin",
  PERSONAL = "personal",
  MANAGER = "manager",
  KITCHEN = "kitchen",
}

export interface IUser {
  id?: number;
  name?: string;
  login?: string;
  password?: string;
  type?: EUserTypes;
  company_id?: number;
}

export interface IMethod {
  id?: number;
  title?: string;
  description?: string;
}

export enum ETableType {
  TABLE_SQUARE = "table_s",
  TABLE_CIRCLE = "table_c",
  WALL = "wall",
  FLOWER = "flower",
  DOOR = "door",
  WINDOW = "window",
  KITCHEN = "kitchen",
  GRASS = "grass",
  PAVILION = "pavilion",
  CHAIR = "chair",
  INFO = "info",
  TRASH = "trash",
  WC = "wc",
  BAR = "bar",
  PLAY = "play",
  MUSIC = "music",
  TREE = "tree",
  LIGHT = "light",
  STORAGE = "storage",
}

export interface ITable {
  id?: number;
  number?: number;
  name?: string;
  x: number;
  y: number;
  for_order: boolean;
  w: number;
  h: number;
  type: ETableType;
  company_id?: number;
}

export interface IPaymentMethod {
  id?: number;
  title?: string;
  description?: string;
  company_id?: number;
}

export interface ITranslate {
  l?: string | undefined;
  n?: string | undefined;
  t?: string | undefined;
}

export interface IVariantOrOptionForPosition {
  n?: string;
  p?: number;
  q?: number;
  t?: ITranslate[];
}

export enum EPriority {
  FIRST = "FIRST",
  SECOND = "SECOND",
}

export interface IPositionForOrder {
  id?: number;
  n?: string;
  p?: number;
  crt?: number;
  f?: number;
  t?: ITranslate[];
  v?: IVariantOrOptionForPosition;
  o?: IVariantOrOptionForPosition[];
  c?: string;
  i?: number;
  d?: number;
  cat: number;
  pr?: EPriority;
}

export enum EPositionsStatuses {
  WAITING = "w",
  DONE = "d",
}

export interface IOrder {
  id?: number;
  n?: number;
  t: number;
  p: IPositionForOrder[];
  c: string;
  crt?: number;
  d?: number;
  f?: number;
  m?: string;
}

export interface IAllPositionsForKitchen {
  tab?: number;
  c?: string;
  oc?: string;
  i?: number;
  cat?: number;
  crt?: number;
  ocrt?: number;
  f?: number;
  n?: string;
  t?: ITranslate;
  v: IVariantOrOptionForPosition;
  o: IVariantOrOptionForPosition[];
  on?: number;
}

export interface IPublicResponse extends ICompany {
  categoriesWithPositions?: { c: string; t?: ITranslate[]; i: IItem[] }[];
}
