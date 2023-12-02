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
