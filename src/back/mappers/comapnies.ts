import { ICompany } from "../types";
import { IRate } from "./rates";

export enum ECompanyStatuses {
  ACTIVE = "active",
  ARCHIVE = "archive",
  UNPAID = "unpaid",
}

export interface ICompanyDB {
  id: number;
  title: string;
  tin: string;
  login: string;
  email: string;
  currency_symbol?: string;
  timezone?: string;
  lang: string;
  utc_diff?: number;
  balance?: number;
  status?: ECompanyStatuses;
  rate_id?: number;
  created?: string;
  next_payment?: string;
  per_month?: number;
  rate?: {
    name: string;
    per_month: number;
  };
}

export const mapCompaniesFromDB = (rows: ICompanyDB[]): ICompany[] =>
  rows?.length
    ? rows.map((row) => ({
        id: row.id,
        title: row.title,
        login: row.login,
        email: row.email,
        tin: row.tin,
        currencySymbol: row.currency_symbol,
        timezone: row.timezone,
        lang: row.lang,
        utcDiff: row.utc_diff,
        status: row.status,
        balance: Number(row.balance),
        rateId: row.rate_id,
        created: row.created,
        nextPayment: row.next_payment,
        perMonth: row.per_month,
      }))
    : [];

export const mapCompaniesToDB = (rows: ICompany[]): ICompanyDB[] =>
  rows?.length
    ? rows.map((row) => ({
        id: row.id,
        title: row.title,
        login: row.login,
        email: row.email,
        tin: row.tin,
        currency_symbol: row.currencySymbol,
        timezone: row.timezone,
        lang: row.lang,
        utc_diff: row.utcDiff,
        status: row.status,
        balance: Number(row.balance),
        rate_id: row.rateId,
        created: row.created,
        next_payment: row.nextPayment,
        per_month: row.perMonth,
      }))
    : [];
