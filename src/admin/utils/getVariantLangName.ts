import { IItem } from '../../back/types';

export const getVariantLangName = (
  position: IItem,
  index: number,
  language: string,
) =>
  position?.vt?.[index]?.find((t) => t.l === language)?.n ??
  position?.v?.[index]?.n ??
  '';
