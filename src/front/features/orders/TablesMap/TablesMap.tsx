import React, { FC, useEffect, useMemo, useState } from "react";
import { OrdersForTableModal } from "../OrdersForTableModal/OrdersForTableModal";
import { useAllTablesQuery, useLazyTablesWithOrdersQuery } from "../api";
import Loading from "../../../shared/loading";
import { MapBlock } from "../../map/MapBlock";
import { ITableWithOrders } from "../../map/types";

export const TablesMap: FC = () => {
  const [tableId, setTableId] = useState<number | undefined>(undefined);

  const [
    loadTablesWithOrders,
    { data: tablesWidthOrders, isLoading: isLoadingTablesWithOrders, isFetching: isFetchingTablesWithOrders },
  ] = useLazyTablesWithOrdersQuery();
  const { data: allTables, isLoading, isFetching } = useAllTablesQuery();

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
    if (table.forOrder) {
      setTableId(Number(table?.id) ?? undefined);
    }
  };

  const ordersForTableModal: any = useMemo(
    () => (tableId !== undefined ? <OrdersForTableModal setTableId={setTableId} tableId={tableId} /> : null),
    [tableId]
  );

  return (
    <>
      {ordersForTableModal}
      <MapBlock items={tableListWithReadyStatus} onClickTable={handleClickTable} selectedTableId={tableId} />
      <Loading
        isLoading={isFetching || isLoading || isLoadingTablesWithOrders || isFetchingTablesWithOrders}
      />
    </>
  );
};
