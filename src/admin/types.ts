export interface IErrorWithFields {
  fields: string[];
  message: string;
  code: string;
}

export interface IOption {
  name: string;
  code: string | number;
}
