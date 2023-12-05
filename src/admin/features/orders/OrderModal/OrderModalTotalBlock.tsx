import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../app/store";
import { IPositionForOrder } from "../../../../back/types/o";
import getSummForOrder from "../../../../utils/getSummForOrder";
import { useAuth } from "../../Auth/Context";

export const OrderModalTotalBlock: FC<{
  discountInPercent?: number;
  positions: IPositionForOrder[];
}> = ({ positions, discountInPercent }) => {
  const i18n = useTranslation();
  const symbol = useAuth()?.whoami?.company?.symbol;

  const { summWithoutDiscount, summWithDiscount } = useMemo(
    () => getSummForOrder(positions, discountInPercent),
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
          {symbol}
        </b>
        <b>
          {summWithDiscount}
          {symbol}
        </b>
      </span>
    </div>
  );
};
