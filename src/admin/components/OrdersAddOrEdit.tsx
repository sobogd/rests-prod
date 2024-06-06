import styled from '@emotion/styled';
import { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { IPositionForOrder } from '../../back/types';
import { getPositionNameInLang } from '../utils/getPositionTitleForList';

import { Button } from './Button';
import { Loading } from './Loading';
import { Modal } from './Modal';
import NoData from './NoData';
import { useLazyLoadOrderByNumberQuery } from './Orders/api';
import { OrdersAddOrEditPosition } from './OrdersAddOrEditPosition';

const PositionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  flex: 1;
`;

const PositionsListItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: ${(p) => p.theme.background2};
  padding: 30px;
  border-radius: 20px;
  cursor: pointer;
`;

const PositionsListItemTitle = styled.div`
  font-size: 18px;
`;

type Props = {
  orderNumber: number | null;
  tableId: number;
  onClose: () => void;
};

export const OrdersAddOrEdit = memo((props: Props) => {
  const { orderNumber, tableId, onClose } = props;

  const [editPositionIndex, setEditPositionIndex] = useState<
    number | null | undefined
  >();

  const { t } = useTranslation();

  const [loadOrder, order] = useLazyLoadOrderByNumberQuery();

  useEffect(() => {
    if (orderNumber) loadOrder({ orderNumber });
  }, [orderNumber, loadOrder]);

  const isLoading =
    order.isLoading ||
    order.isFetching ||
    (!!orderNumber && order.isUninitialized);

  const renderPositionItem = useCallback(
    (position: IPositionForOrder, index: number) => (
      <PositionsListItem onClick={() => setEditPositionIndex(index)}>
        <PositionsListItemTitle>
          {getPositionNameInLang(position)}
        </PositionsListItemTitle>
      </PositionsListItem>
    ),
    [],
  );

  const closeAddOrEditPositionHandler = useCallback(
    (update?: boolean) => {
      setEditPositionIndex(undefined);
      if (orderNumber && update) loadOrder({ orderNumber });
    },
    [loadOrder, orderNumber],
  );

  return (
    <Modal
      onClose={onClose}
      title={
        orderNumber
          ? `${t('orders.addOrEdit.edit')}${orderNumber}`
          : `${t('orders.addOrEdit.add')}`
      }
    >
      {!order?.data?.p?.length && <NoData text={t('orders.addOrEdit.empty')} />}
      {!!order?.data?.p?.length && (
        <PositionsList>
          {order?.data?.p?.map((position, index) =>
            renderPositionItem(position, index),
          )}
        </PositionsList>
      )}
      <Button
        label={t('orders.addOrEdit.addPosition')}
        onClick={() => setEditPositionIndex(null)}
        disabled={isLoading}
      />
      <Loading isFullscreen isLoading={isLoading} />
      {editPositionIndex !== undefined && (
        <OrdersAddOrEditPosition
          order={order.data}
          tableId={tableId}
          editPositionIndex={editPositionIndex}
          onClose={closeAddOrEditPositionHandler}
        />
      )}
    </Modal>
  );
});
