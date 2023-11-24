export interface IPaymentMethod {
  id?: number;
  title: string;
  description: string;
  companyId: number;
}

export interface IPaymentMethodsState {
  paymentMethods: IPaymentMethod[];
  isLoading: boolean;
}
