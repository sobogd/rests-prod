export interface IDailySummaryReport {
  summary: {
    total: number;
    paymentMethodId: number;
  }[];
  ordersCount: number;
  averageReceipt: number;
  date: string;
  totalSummary: number;
}

export interface IDayDetailsReport {
  id: number;
  tableId: number;
  created: string;
  comment?: string;
  status: any;
  total: number;
  discountId?: number;
  paymentMethodId: number;
  orderPositions: {
    id: number;
    orderId: number;
    comment: number;
  }[];
}
