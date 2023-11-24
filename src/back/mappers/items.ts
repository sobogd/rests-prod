/**
 * @id id
 * @company company id
 * @c category id
 * @s sorting number
 * @n name
 * @p price
 * @d description
 * @i instruction
 * @a is active
 * @h is hide
 * @v variants
 * @o options
 * @t translations
 * @vt variants translations
 * @ot options translations
 * @f file string
 */
export interface IItem {
  id?: number;
  company?: number;
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
