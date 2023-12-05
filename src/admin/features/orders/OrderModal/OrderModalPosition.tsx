import { FC } from "react";
import { useAppSelector } from "../../../app/store";
import { UniversalListItemBordered } from "../../../app/styles";
import { IPositionForOrder } from "../../../../back/types/o";
import { useAuth } from "../../Auth/Context";

export const OrderModalPosition: FC<{
  hidePrices?: boolean;
  hideBorder?: boolean;
  discountInPercent: number;
  position: IPositionForOrder;
  onClick?: () => void;
}> = ({ position, discountInPercent, onClick, hidePrices, hideBorder }) => {
  const symbol = useAuth()?.whoami?.company?.symbol;

  const getPriceWithDiscount = (p: any, q: any, d: any) => {
    const discount = Math.round((Number(p) * Number(q) - Number(p) * Number(q) * (d / 100) ?? 0) * 100) / 100;
    return discount;
  };

  const styleForDiscountPrice = { marginLeft: "5px" };
  const styleForPriceBeforeDiscount = discountInPercent
    ? { textDecoration: "line-through", color: "gray", fontSize: "12px" }
    : undefined;

  const getPriceWithDiscountView = (p: any, q: any) => {
    return !hidePrices ? (
      <>
        {Number(p) && Number(q) ? (
          <b style={styleForPriceBeforeDiscount}>
            {Number(p) * Number(q)}
            {symbol}
          </b>
        ) : null}
        {discountInPercent && Number(p) !== 0 ? (
          <b style={styleForDiscountPrice}>
            {getPriceWithDiscount(p, q, discountInPercent)}
            {symbol}
          </b>
        ) : null}
      </>
    ) : null;
  };

  return (
    <UniversalListItemBordered onClick={() => onClick?.()} style={{ border: hideBorder ? "0" : undefined }}>
      <p style={{ marginBottom: position?.v || position?.o?.length ? "5px" : "0px" }}>
        <span>
          {discountInPercent && Number(position) !== 0 ? (
            <strong>-{Math.round(discountInPercent)}%</strong>
          ) : null}
          {position?.n}
        </span>
        <span>{getPriceWithDiscountView(position.p, 1)}</span>
      </p>
      {position?.v ? (
        <p>
          <span>{position.v.n}</span>
          <span>{getPriceWithDiscountView(position.v.p, 1)}</span>
        </p>
      ) : null}
      {position?.o?.length
        ? position?.o.map((po) => (
            <p>
              <span>
                {po.q}x {po.n}
              </span>
              <span>{getPriceWithDiscountView(po.p, po.q)}</span>
            </p>
          ))
        : null}
      {position?.c ? (
        <p>
          <span>{position.c}</span>
        </p>
      ) : null}
    </UniversalListItemBordered>
  );
};
