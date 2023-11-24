export interface IPositionConstructor {
  name: string;
  description?: string;
  price: number;
  composition?: IPositionComposition[];
  categories: IPositionCategory[];
  additional: IPositionAdditional[];
  isAdditional: boolean;
  multipleChoice?: boolean;
  sort?: number;
}

export interface IPosition extends IPositionConstructor {
  id: number;
}

export interface IPositionForCreate extends IPositionConstructor {
  id?: number;
}

export interface IPositionValues {
  id: string;
  name: string;
  description: string;
  price: string;
}

export interface IPositionComposition {
  element: string;
  weight: string;
}

export interface IPositionCategory {
  categoryId: number;
}

export interface ITranslation {
  l?: string;
  n?: string;
}

export interface IPositionAdditional {
  positionId: number;
}

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
  c?: number;
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
    d?: string;
  }[];
  o?: {
    n?: string;
    p?: number;
    d?: string;
  }[];
  t?: {
    l?: string;
    n?: string;
  }[];
  vt?: {
    l?: string;
    n?: string;
  }[][];
  ot?: {
    l?: string;
    n?: string;
  }[][];
  f?: string;
  fChanged?: boolean;
}
