import { useAppSelector } from "../app/store";

export const useLoading = (): boolean => {
  const { isLoading: isLoadingUsers } = useAppSelector((s) => s.users);
  const { isLoading: isLoadingTables } = useAppSelector((s) => s.tables);
  const { isLoading: isLoadingElements } = useAppSelector((s) => s.elements);
  const { isLoading: isLoadingCompanies } = useAppSelector((s) => s.companies);
  const { isLoading: isLoadingReports } = useAppSelector((s) => s.reports);
  const { isLoading: isLoadingDiscounts } = useAppSelector((s) => s.discounts);
  const { isLoading: isLoadingBilling } = useAppSelector((s) => s.billing);
  const { isLoading: isLoadingPaymentMethods } = useAppSelector((s) => s.paymentMethods);

  return (
    isLoadingUsers ||
    isLoadingTables ||
    isLoadingElements ||
    isLoadingCompanies ||
    isLoadingReports ||
    isLoadingDiscounts ||
    isLoadingPaymentMethods ||
    isLoadingBilling
  );
};
