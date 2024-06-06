import styled from '@emotion/styled';

import { IItem, IPositionForOrder } from '../../back/types';
import i18n from '../i18n';
import { newPallet } from '../styles';

import { getPositionPriceWithDiscount } from './getPositionPriceWithDiscount';
import { dateDiffNowHHmm } from './timeInFormat';

const PosForOrderTitle = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 5px;
  width: 100%;
`;

const PosForOrderTitleName = styled.div`
  margin-right: 5px;
`;

const PosForOrderTitleDiscount = styled.strong`
  font-weight: 400;
  float: right;
  background: ${newPallet.orange2};
  color: white;
  font-size: 14px;
  padding: 2px 7px;
  border-radius: 8px;
  height: 25px;
`;

const PosForOrderPricesDiscount = styled(PosForOrderTitleDiscount)`
  background: ${newPallet.orange1};
  height: 25px;
`;

export const getPositionNameInLang = (
  position: IPositionForOrder | IItem,
): string => {
  const langName = position?.t?.find((t) => t.l === i18n.language)?.t;

  if (!langName || langName === '') {
    return position.n ?? '';
  }

  return langName;
};

export const getPositionTitleForList = (
  position: IPositionForOrder,
  discountForOrder: number | undefined,
  symbol: string | undefined,
  type?: 'time' | 'price',
) => {
  const discountInPercent =
    !position.d || position.d <= 0 ? discountForOrder ?? 0 : position.d ?? 0;
  let langName = position?.t?.find((t) => t.l === i18n.language)?.t;
  if (!langName || langName === '') {
    langName = position.n;
  }

  return (
    <PosForOrderTitle>
      <PosForOrderTitleName>{langName}</PosForOrderTitleName>
      {type === 'price' ? (
        <>
          {discountInPercent && Number(position.p) !== 0 ? (
            <PosForOrderTitleDiscount>
              -{Math.round(discountInPercent)}%
            </PosForOrderTitleDiscount>
          ) : null}
          <PosForOrderPricesDiscount>
            {getPositionPriceWithDiscount(position, discountInPercent)}
            {symbol}
          </PosForOrderPricesDiscount>
        </>
      ) : null}
      {type === 'time' ? (
        <PosForOrderPricesDiscount>
          {dateDiffNowHHmm(position.crt)}
        </PosForOrderPricesDiscount>
      ) : null}
    </PosForOrderTitle>
  );
};
