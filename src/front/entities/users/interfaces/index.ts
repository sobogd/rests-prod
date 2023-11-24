import { EUserType } from "../enums";
import { bool } from "yup";
import { ICompany } from "../../companies/model";

export interface IUsersState {
  usersForCompany: IUser[];
  isLoading: boolean;
  error: string;
  form: IUserStateForm;
}

export interface IUserStateForm {
  isOpen: boolean;
  formData?: IUser;
  message?: string;
  isSuccess?: boolean;
  isOpenRemove: boolean;
}

export interface IUser {
  id: number;
  name: string;
  type: EUserType;
  login: string;
  token?: string;
  company?: ICompany;
  email?: string;
  lastLogin?: string;
  loginHash?: string;
}

export interface IUserChangeFields {
  name: string;
  value: string;
}
