export interface ICategory {
  id?: number;
  name: string;
  description: string;
}

export interface IGetCategoryDetails {
  id?: number;
  name: string;
  description?: string;
  translations: { code: string; name: string }[];
}
