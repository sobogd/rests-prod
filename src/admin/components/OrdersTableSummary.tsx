import styled from '@emotion/styled';
import { memo, useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { TbClockPlay, TbId, TbListNumbers, TbMessage } from 'react-icons/tb';

import { IOrder } from '../../back/types';
import { dateHHmm } from '../utils/timeInFormat';

import { Button } from './Button';
import { Loading } from './Loading';
import { Modal } from './Modal';
import NoData from './NoData';
import {
  useAllTablesQuery,
  useLazyListOrdersForTableQuery,
} from './Orders/api';

const OrdersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  flex: 1;
`;

const OrdersListItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: ${(p) => p.theme.background2};
  padding: 30px;
  border-radius: 20px;
`;

const OrdersListItemSummary = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
`;

const OrdersListItemSummaryItem = styled.div`
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  color: ${(p) => p.theme.text1};
  svg {
    width: 21px;
    height: 21px;
    color: ${(p) => p.theme.text3};
  }
`;

const OrdersListItemFull = styled(OrdersListItemSummary)`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 5px;
`;

const OrdersListItemFullItem = styled.div`
  color: ${(p) => p.theme.text3};
  font-size: 16px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  svg {
    top: 3px;
    position: relative;
    margin-right: 10px;
  }
`;

type Props = {
  tableId: number;
  onClose: () => void;
  onClickBill: (orderNumber: number) => void;
  onClickEdit: (orderNumber: number, tableId: number) => void;
  onClickSplit: (orderNumber: number) => void;
  onClickAdd: (tableId: number) => void;
};

export const OrdersTableSummary = memo((props: Props) => {
  const {
    tableId,
    onClose,
    onClickBill,
    onClickEdit,
    onClickSplit,
    onClickAdd,
  } = props;

  const { t } = useTranslation();

  const tables = useAllTablesQuery();

  const [loadOrders, orders] = useLazyListOrdersForTableQuery();

  const isLoading =
    orders.isLoading || orders.isFetching || orders.isUninitialized;

  useEffect(() => {
    loadOrders({ tableId });
  }, [loadOrders, tableId]);

  const tableNumber = useMemo(
    () => tables?.data?.find((t) => t.id === tableId)?.number,
    [tableId, tables?.data],
  );

  const renderOrderItem = useCallback(
    (order: IOrder, tableId: number) => {
      return (
        <OrdersListItem key={order.id}>
          <OrdersListItemSummary>
            <OrdersListItemSummaryItem>
              <TbId /> {order.n}
            </OrdersListItemSummaryItem>
            <OrdersListItemSummaryItem>
              <TbClockPlay /> {dateHHmm(order.crt)}
            </OrdersListItemSummaryItem>
          </OrdersListItemSummary>
          {order.c && order.c !== '' && (
            <OrdersListItemSummary>
              <OrdersListItemSummaryItem>
                <TbMessage /> {order.c}
              </OrdersListItemSummaryItem>
            </OrdersListItemSummary>
          )}
          <OrdersListItemFull>
            {order.p.map((p) => (
              <OrdersListItemFullItem key={p.crt}>
                <TbListNumbers />
                {p.n}
              </OrdersListItemFullItem>
            ))}
          </OrdersListItemFull>
          <Button
            label={t('orders.tableSummary.edit')}
            color="secondary"
            size="small"
            onClick={() => order?.n && onClickEdit(order.n, tableId)}
          />
          <Button
            label={t('orders.tableSummary.split')}
            color="secondary"
            size="small"
            onClick={() => order?.n && onClickSplit(order.n)}
          />
          <Button
            label={t('orders.tableSummary.bill')}
            color="primary"
            size="small"
            onClick={() => order?.n && onClickBill(order.n)}
          />
        </OrdersListItem>
      );
    },
    [onClickBill, onClickEdit, onClickSplit, t],
  );

  return (
    <Modal
      onClose={onClose}
      title={`${t('orders.tableSummary.tableNumber')}${tableNumber}`}
    >
      <Loading isFullscreen isLoading={isLoading} />
      {!orders?.data?.length && (
        <NoData text={t('orders.tableSummary.empty')} />
      )}
      {!!orders?.data?.length && (
        <OrdersList>
          {orders?.data?.map((order) => renderOrderItem(order, tableId))}
        </OrdersList>
      )}
      <Button
        label={t('orders.tableSummary.add')}
        onClick={() => onClickAdd(tableId)}
        disabled={isLoading}
      />
    </Modal>
  );
});
