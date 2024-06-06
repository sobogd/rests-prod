import { FC } from 'react';

import { IPositionForOrder } from '../../../../back/types';
import { useAuth } from '../../../providers/Auth';
import { getPositionDescriptionForList } from '../../../utils/getPositionDescriptionForList';
import { getPositionTitleForList } from '../../../utils/getPositionTitleForList';
import List from '../../List';

import { OrderModalTotalBlock } from './OrderModalTotalBlock';

export const OrderModalList: FC<{
  setSelectedPosition: (position: IPositionForOrder) => void;
  onClickTotalBlcok: () => void;
  positions: IPositionForOrder[];
  discountForOrder: number | null | undefined;
}> = ({
  positions,
  setSelectedPosition,
  discountForOrder,
  onClickTotalBlcok,
}) => {
  const symbol = useAuth()?.whoami?.company?.symbol;

  return (
    <>
      <List
        items={positions.map((p) => ({
          title: getPositionTitleForList(
            p,
            discountForOrder ?? 0,
            symbol,
            'price',
          ),
          description: getPositionDescriptionForList(p),
          buttonType: 'next',
          onClick: () => setSelectedPosition(p),
          id: JSON.stringify(p),
        }))}
      />
      <OrderModalTotalBlock
        positions={positions}
        discountInPercent={discountForOrder ?? undefined}
        onClickTotalBlcok={onClickTotalBlcok}
      />
    </>
  );
};
