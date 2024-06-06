import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Loading } from '../../Loading';
import { ModalRests } from '../../ModalRests';
import NoData from '../../NoData';
import { useLazyListOrdersForTableQuery } from '../api';
import { OrderModal } from '../OrderModal/OrderModal';

import { OrdersForTableModalList } from './OrdersForTableModalList';

export const OrdersForTableModal: FC<{
  setTableId: (orderId: number | undefined) => void;
  tableId: number | undefined;
}> = ({ tableId, setTableId }) => {
  const i18n = useTranslation();
  const [orderNumber, setOrderNumber] = useState<number | null | undefined>(
    undefined,
  );

  const [
    getOrdersForTable,
    { isLoading: isLoadingOrders, isFetching: isFetchingOrders, data: orders },
  ] = useLazyListOrdersForTableQuery();

  useEffect(() => {
    if (orderNumber === undefined && tableId !== undefined) {
      getOrdersForTable({ tableId });
    }
  }, [orderNumber, tableId]);

  const isLoading = isLoadingOrders || isFetchingOrders;

  return (
    <>
      <ModalRests
        title={`${i18n.t('orders.tabModTitle')}`}
        onBack={() => setTableId(undefined)}
        footerSticks={[
          {
            icon: 'new',
            onClick: () => {
              setOrderNumber(null);
            },
          },
        ]}
        withPadding
        isShow={tableId != null ? true : false}
      >
        <OrderModal
          setOrderNumber={setOrderNumber}
          orderNumber={orderNumber}
          tableId={tableId}
          setTableId={setTableId}
        />
        <Loading isLoading={isLoading} />
        {!orders?.length ? (
          <NoData pt text={i18n.t('orders.emptyOrders')} />
        ) : (
          <OrdersForTableModalList
            orders={orders}
            setOrderNumber={setOrderNumber}
          />
        )}
      </ModalRests>
    </>
  );
};
