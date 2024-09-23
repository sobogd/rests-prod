import styled from '@emotion/styled';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { Loading } from './Loading';
import { MapBlock } from './Map/MapBlock';
import { ITableWithOrders } from './Map/types';
import {
  useLazyAllTablesQuery,
  useLazyTablesWithOrdersQuery,
} from './Orders/api';
import { OrdersAddOrEdit } from './OrdersAddOrEdit';
import { OrdersTableSummary } from './OrdersTableSummary';

const OrdersContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
`;

export const Orders = () => {
  const [tableId, setTableId] = useState<number | undefined>(undefined);

  const [orderNumberBill, setOrderNumberBill] = useState<
    number | null | undefined
  >(undefined);

  const [orderNumberSplit, setOrderNumberSplit] = useState<
    number | null | undefined
  >(undefined);

  const [order, setOrder] = useState<
    | {
        type: 'details' | 'split' | 'bill';
        tableId: number | undefined;
        orderNumber: undefined | null | number;
      }
    | undefined
  >(undefined);

  const [loadTablesOrders, tablesOrders] = useLazyTablesWithOrdersQuery();
  const [loadTables, tables] = useLazyAllTablesQuery();

  useEffect(() => {
    loadTables();
    loadTablesOrders();
  }, [loadTables, loadTablesOrders]);

  useEffect(() => {
    const timer = setInterval(() => {
      loadTablesOrders();
    }, 30000);

    return () => {
      clearInterval(timer);
    };
  }, [loadTablesOrders, tableId]);

  const tableListWithReadyStatus = useMemo(
    () =>
      tables?.data?.map((table) => {
        const ordersForTable = tablesOrders?.data?.find(
          (t) => Number(t.t) === Number(table.id),
        );

        return {
          ...table,
          isHaveOrders: !!ordersForTable,
          ifAllReady: !!ordersForTable?.f,
        };
      }) || [],
    [tables, tablesOrders?.data],
  );

  const handleClickTable = useCallback((table: ITableWithOrders) => {
    if (table.for_order) {
      setTableId(Number(table?.id) ?? undefined);
    }
  }, []);

  const closeTableSummaryHandler = useCallback(() => {
    setTableId(undefined);
  }, []);

  const addHandler = useCallback((tableId: number) => {
    setTableId(undefined);
    setOrder({
      type: 'details',
      tableId,
      orderNumber: null,
    });
  }, []);

  const editHandler = useCallback((orderNumber: number, tableId: number) => {
    setTableId(undefined);
    setOrder({
      type: 'details',
      tableId,
      orderNumber,
    });
  }, []);

  const splitHandler = useCallback((orderNumber: number) => {
    setTableId(undefined);
    setOrderNumberSplit(orderNumber);
  }, []);

  const billHandler = useCallback((orderNumber: number) => {
    setTableId(undefined);
    setOrderNumberBill(orderNumber);
  }, []);

  return (
    <OrdersContainer>
      <MapBlock
        items={tableListWithReadyStatus}
        onClickTable={handleClickTable}
      />
      <Loading
        isLoading={
          tables.isLoading ||
          tables.isFetching ||
          tablesOrders.isLoading ||
          tablesOrders.isFetching
        }
        isFullscreen
      />
      {!!tableId && (
        <OrdersTableSummary
          tableId={tableId}
          onClose={closeTableSummaryHandler}
          onClickBill={billHandler}
          onClickAdd={addHandler}
          onClickEdit={editHandler}
          onClickSplit={splitHandler}
        />
      )}
      {order?.type === 'details' &&
        order?.tableId &&
        order?.orderNumber !== undefined && (
          <OrdersAddOrEdit
            orderNumber={order.orderNumber}
            tableId={order.tableId}
            onClose={() => setOrder(undefined)}
          />
        )}
    </OrdersContainer>
  );
};
