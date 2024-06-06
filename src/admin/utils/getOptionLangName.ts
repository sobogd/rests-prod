import { IItem } from '../../back/types';

export const getOptionLangName = (
  position: IItem,
  index: number,
  language: string,
) =>
  position?.ot?.[index]?.find((t) => t.l === language)?.n ??
  position?.o?.[index]?.n ??
  '';
