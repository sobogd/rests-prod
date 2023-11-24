export enum EPaymentTypes {
  DEPOSIT = "deposit",
  WITHDRAW = "withdraw",
}

export enum EPaymentStatuses {
  NEW = "new",
  PAID = "paid",
  ERROR = "error",
}

export interface IPayment {
  id: number;
  date: string;
  status: EPaymentStatuses;
  amount: number;
  companyId: number;
  type: EPaymentTypes;
}

export interface IPaymentDB {
  id: number;
  date: string;
  status: EPaymentStatuses;
  amount: number;
  company_id: number;
  type: EPaymentTypes;
}

export const mapPaymentsFromDB = (rows: IPaymentDB[]): IPayment[] =>
  rows?.length
    ? rows.map((row) => ({
        id: row.id,
        date: row.date,
        status: row.status,
        amount: Number(row.amount),
        companyId: row.company_id,
        type: row.type,
      }))
    : [];

export const mapPaymentsToDB = (rows: IPayment[]): IPaymentDB[] =>
  rows?.length
    ? rows.map((row) => ({
        id: row.id,
        date: row.date,
        status: row.status,
        amount: Number(row.amount),
        company_id: row.companyId,
        type: row.type,
      }))
    : [];
