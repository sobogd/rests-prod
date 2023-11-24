import { FC, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { OrderModal } from "../OrderModal/OrderModal";
import { OrdersForTableModalList } from "./OrdersForTableModalList";
import { useAppSelector } from "../../../app/store";
import { NothingBlock } from "../../../app/styles";
import { ModalRests } from "../../../shared/ModalRests";
import Loading from "../../../shared/loading";
import { useLazyListOrdersForTableQuery } from "../api";

export const OrdersForTableModal: FC<{
  setTableId: (orderId: number | undefined) => void;
  tableId: number | undefined;
}> = ({ tableId, setTableId }) => {
  const i18n = useTranslation();
  const tables = useAppSelector((s) => s.tables.items);
  const [orderNumber, setOrderNumber] = useState<number | null | undefined>(undefined);

  const [getOrdersForTable, { isLoading: isLoadingOrders, isFetching: isFetchingOrders, data: orders }] =
    useLazyListOrdersForTableQuery();

  const orderModal = useMemo(
    () =>
      orderNumber !== undefined ? (
        <OrderModal
          setOrderNumber={setOrderNumber}
          orderNumber={orderNumber}
          tableId={tableId}
          setTableId={setTableId}
        />
      ) : null,
    [orderNumber]
  );

  useEffect(() => {
    if (orderNumber === undefined && tableId !== undefined) {
      getOrdersForTable({ tableId });
    }
  }, [orderNumber]);

  const getFooterButton = () => {
    return {
      title: i18n.t("orders.tabModButton", { tableNumber: selectedTable?.number }),
      onClick: () => {
        setOrderNumber(null);
      },
    };
  };

  const selectedTable = tables.find((t: any) => Number(t.id) === Number(tableId));

  const isLoading = isLoadingOrders || isFetchingOrders;

  return (
    <ModalRests
      title={`${i18n.t("orders.tabModTitle")} №${selectedTable?.number}`}
      onBack={() => setTableId(undefined)}
      footerButton={getFooterButton()}
    >
      {orderModal}
      <Loading isLoading={isLoading} />
      {!orders?.length ? <NothingBlock>{i18n.t("orders.emptyOrders")}</NothingBlock> : null}
      <OrdersForTableModalList orders={orders} setOrderNumber={setOrderNumber} />
    </ModalRests>
  );
};
