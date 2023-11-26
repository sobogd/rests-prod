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

export interface IPositionForOrder {
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
