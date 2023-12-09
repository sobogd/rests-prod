import styled from "@emotion/styled";
import i18n from "../i18n";
import { getPositionPriceWithDiscount } from "./getPositionPriceWithDiscount";
import { IPositionForOrder } from "../../back/types";
import { utcToZonedTime } from "date-fns-tz";
import { newPallet } from "../styles";

const PosForOrderTitle = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
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

export const getPositionTitleForList = (
  position: IPositionForOrder,
  discountForOrder: number | undefined,
  symbol: string | undefined,
  type?: "time" | "price"
) => {
  const discountInPercent = !position.d || position.d <= 0 ? discountForOrder ?? 0 : position.d ?? 0;
  let langName = position?.t?.find((t) => t.l === i18n.language)?.t;
  if (!langName || langName === "") {
    langName = position.n;
  }
  const utcTime = Number(utcToZonedTime(new Date(), "UTC").valueOf());
  return (
    <PosForOrderTitle>
      <PosForOrderTitleName>{langName}</PosForOrderTitleName>
      {type === "price" ? (
        <>
          {discountInPercent && Number(position.p) !== 0 ? (
            <PosForOrderTitleDiscount>-{Math.round(discountInPercent)}%</PosForOrderTitleDiscount>
          ) : null}
          <PosForOrderPricesDiscount>
            {getPositionPriceWithDiscount(position, discountInPercent)}
            {symbol}
          </PosForOrderPricesDiscount>
        </>
      ) : null}
      {type === "time" ? (
        <PosForOrderPricesDiscount>
          {Math.round((utcTime - Number(position.crt)) / 60000)} min
        </PosForOrderPricesDiscount>
      ) : null}
    </PosForOrderTitle>
  );
};
