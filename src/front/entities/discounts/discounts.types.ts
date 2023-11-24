export interface IDiscount {
  id?: number;
  percent: number;
  title: string;
  description: string;
  companyId: number;
}

export interface IDiscountsState {
  discounts: IDiscount[];
  isLoading: boolean;
}
