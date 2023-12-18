import React, { FC, useEffect, useState } from "react";
import { OrdersForTableModal } from "../OrdersForTableModal/OrdersForTableModal";
import { useLazyAllTablesQuery, useLazyTablesWithOrdersQuery } from "../api";
import Loading from "../../loading";
import { MapBlock } from "../../Map/MapBlock";
import { ITableWithOrders } from "../../Map/types";
import { ModalRests } from "../../ModalRests";
import { useTranslation } from "react-i18next";

export const TablesMap: FC = () => {
  const { i18n } = useTranslation();
  const [tableId, setTableId] = useState<number | undefined>(undefined);

  const [
    loadTablesWithOrders,
    { data: tablesWidthOrders, isLoading: isLoadingTablesWithOrders, isFetching: isFetchingTablesWithOrders },
  ] = useLazyTablesWithOrdersQuery();
  const [loadTables, { data: allTables, isLoading, isFetching }] = useLazyAllTablesQuery();

  useEffect(() => {
    loadTables();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!tableId) {
        loadTablesWithOrders();
      }
    }, 30000);
    return () => {
      clearInterval(timer);
    };
  }, [tableId]);

  useEffect(() => {
    if (!tableId) loadTablesWithOrders();
  }, [tableId]);

  const tableListWithReadyStatus = React.useMemo(
    () =>
      allTables?.map((table) => {
        const ordersForTable = tablesWidthOrders?.find((t) => Number(t.t) === Number(table.id));
        return {
          ...table,
          isHaveOrders: !!ordersForTable,
          ifAllReady: !!ordersForTable?.f,
        };
      }) || [],
    [allTables, tablesWidthOrders]
  );

  const handleClickTable = (table: ITableWithOrders) => {
    if (table.for_order) {
      setTableId(Number(table?.id) ?? undefined);
    }
  };

  return (
    <>
      <ModalRests title={i18n.t("menu.names.ORDERS")} isGeneral={true} isOpenAdditional={tableId != null}>
        <MapBlock
          items={tableListWithReadyStatus}
          onClickTable={handleClickTable}
          selectedTableId={tableId}
        />
        <Loading
          isLoading={isFetching || isLoading || isLoadingTablesWithOrders || isFetchingTablesWithOrders}
        />
      </ModalRests>
      <OrdersForTableModal setTableId={setTableId} tableId={tableId} />
    </>
  );
};
