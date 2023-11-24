import { ICompany } from "./comapnies";

export interface AuthorizationResponse extends IUser {
  token: string;
  company?: ICompany;
  loginHash?: string;
}

export enum EUserTypes {
  ADMIN = "admin",
  PERSONAL = "personal",
  MANAGER = "manager",
  KITCHEN = "kitchen",
}

export enum EUserStatuses {
  ACTIVE = "active",
  ARCHIVED = "archived",
}

export interface AuthorizationRequest {
  login: string;
  password: string;
}

export interface HashAuthorizationRequest {
  hash: string;
}

export interface IUserForUpdate {
  id: number;
  newPassword?: string;
  name: string;
  type: string;
  login: string;
}

export interface IUserForCreate {
  newPassword: string;
  name: string;
  type: string;
  login: string;
}

export interface IUser {
  id?: number;
  name: string;
  login?: string;
  password?: string;
  type: EUserTypes;
  companyId?: number;
  status?: EUserStatuses;
  companyLogin?: string;
  lastLogin?: string;
  lang?: string;
}

export interface IUserDB {
  id?: number;
  name: string;
  login?: string;
  password?: string;
  type: EUserTypes;
  company_id?: number;
  status?: EUserStatuses;
  companyLogin?: string;
  last_login?: string;
}

export const mapUsersFromDB = (rows: IUserDB[]): IUser[] =>
  rows?.length
    ? rows.map((row) => ({
        id: row.id,
        name: row.name,
        login: row.login,
        password: row.password,
        type: row.type,
        companyId: row.company_id,
        status: row.status,
        companyLogin: row.companyLogin,
        lastLogin: row.last_login,
      }))
    : [];

export const mapUsersToDB = (rows: IUser[]): IUserDB[] =>
  rows?.length
    ? rows.map((row) => ({
        id: row.id,
        name: row.name,
        login: row.login,
        password: row.password,
        type: row.type,
        company_id: row.companyId,
        status: row.status,
        companyLogin: row.companyLogin,
        last_login: row.lastLogin,
      }))
    : [];
