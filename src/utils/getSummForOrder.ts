import { IPositionForOrder } from "../back/types";

const getSummForOrder = (positions: IPositionForOrder[], orderDiscount?: number) => {
  let summWithDiscount = 0;
  let summWithoutDiscount = 0;

  positions.forEach((position) => {
    let itemSum = 0;

    // @ts-expect-error for old price values
    itemSum = Number(position.p ?? position.price) ?? 0;

    if (position?.v) {
      itemSum = itemSum + (Number(position?.v?.p) ?? 0);
    }

    if (position?.o) {
      itemSum =
        itemSum +
        (position?.o?.reduce((posum, po) => {
          return posum + (Number(po.p) ?? 0) * (Number(po.q) ?? 0);
        }, 0) ?? 0);
    }

    summWithDiscount =
      summWithDiscount +
      (itemSum -
        itemSum * ((position?.d && Number(position?.d) ? position?.d : Number(orderDiscount ?? 0)) / 100));
    summWithoutDiscount = summWithoutDiscount + itemSum;
  }, 0);
  return {
    summWithoutDiscount: summWithoutDiscount ? Math.round(summWithoutDiscount * 100) / 100 : 0,
    summWithDiscount: summWithDiscount ? Math.round((summWithDiscount * 100) / 100) : 0,
  };
};

export default getSummForOrder;
