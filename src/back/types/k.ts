import { ITranslate, IVariantOrOptionForPosition } from "./o";

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
