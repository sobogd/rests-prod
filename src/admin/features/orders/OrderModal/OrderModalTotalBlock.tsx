import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../app/store";
import { IPositionForOrder } from "../../../../back/types/o";

export const getSummWithDiscount = (positions: IPositionForOrder[], orderDiscount?: number) => {
  let summWithDiscount = 0;
  let summWithoutDiscount = 0;
  console.log({ positions, orderDiscount });

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
        itemSum * ((position?.d && Number(position?.d) ? position?.d : Number(orderDiscount) ?? 0) / 100));
    summWithoutDiscount = summWithoutDiscount + itemSum;
  }, 0);
  return {
    summWithoutDiscount: Math.round(summWithoutDiscount * 100) / 100,
    summWithDiscount: Math.round(summWithDiscount * 100) / 100,
  };
};

export const OrderModalTotalBlock: FC<{
  discountInPercent?: number;
  positions: IPositionForOrder[];
}> = ({ positions, discountInPercent }) => {
  const i18n = useTranslation();
  const currencySymbol = useAppSelector((s) => s.common.user?.company?.currencySymbol);

  const { summWithoutDiscount, summWithDiscount } = useMemo(
    () => getSummWithDiscount(positions, discountInPercent),
    [positions, discountInPercent]
  );

  const isWithoutDiscount = Number(summWithoutDiscount) === Number(summWithDiscount);

  return (
    <div>
      <span>{i18n.t("orders.totalTitle")}</span>
      <span>
        <b
          style={{
            textDecoration: isWithoutDiscount ? undefined : "line-through",
            marginRight: "5px",
            fontSize: isWithoutDiscount ? undefined : "13px",
            display: isWithoutDiscount ? "none" : undefined,
          }}
        >
          {summWithoutDiscount}
          {currencySymbol}
        </b>
        <b>
          {summWithDiscount}
          {currencySymbol}
        </b>
      </span>
    </div>
  );
};
