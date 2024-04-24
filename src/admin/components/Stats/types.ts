import { IOrder } from "../../../back/types";

export type DayWithOrders = {
  date: string;
  orders: IOrder[];
  total: number;
  summary: { title: string; total: number }[];
};
