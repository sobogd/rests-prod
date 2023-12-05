import { useAppSelector } from "../app/store";

export const useLoading = (): boolean => {
  const { isLoading: isLoadingUsers } = useAppSelector((s) => s.users);
  const { isLoading: isLoadingTables } = useAppSelector((s) => s.tables);
  const { isLoading: isLoadingBilling } = useAppSelector((s) => s.billing);

  return isLoadingUsers || isLoadingTables || isLoadingBilling;
};
