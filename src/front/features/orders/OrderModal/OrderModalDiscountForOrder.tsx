import styled from "@emotion/styled";
import { FC, useState } from "react";
import { OrderModalTotalBlock } from "./OrderModalTotalBlock";
import { useTranslation } from "react-i18next";
import { WindowRests } from "../../../shared/WindowRests";
import { prePrimaryColor } from "../../../app/styles";
import { IPositionForOrder } from "../../../../back/types/o";

const DiscountForOrderTitle = styled.div`
  width: 100%;
  padding: 15px 20px;
  background: ${prePrimaryColor};
  font-weight: 600;
  font-size: 20px;
  color: white;
`;

const DiscountForOrderTabs = styled.div`
  display: flex;
  width: calc(100% - 40px);
  margin: 20px;
  border: 1px solid #ede7ff;
  border-radius: 10px;
  overflow: hidden;
`;

const DiscountForOrderTab = styled.div`
  display: flex;
  padding: 5px 10px;
  flex: 100%;
  font-size: 15px;
  border-right: 1px solid #ede7ff;
  align-items: center;
  justify-content: center;
  height: 40px;
  cursor: pointer;
  :last-child {
    border-right: 0;
  }
`;

const PercentTabs = styled.div`
  width: 100%;
  margin: 0 0 15px;
  display: flex;
  overflow-x: scroll;
  justify-content: flex-start;
  span {
    padding: 5px 20px;
    border: 1px solid #ede7ff;
    border-radius: 10px;
    font-size: 15px;
    height: 40px;
    overflow: hidden;
    width: 40px;
    align-items: center;
    justify-content: center;
    display: flex;
    margin: 0 0 5px 5px;
    cursor: pointer;
    min-width: calc(5% - 6.7px);
    :first-child {
      margin-left: 20px;
    }
    :last-child {
      margin-right: 20px;
    }
  }
`;

const AmountInput = styled.input`
  height: 40px;
  border-radius: 10px;
  border: 1px solid #ede7ff;
  width: calc(100% - 40px);
  margin: 0 20px 20px;
  padding: 0 20px;
  font-size: 15px;
  outline: none;
`;

const ApplyDiscountButton = styled.button`
  width: calc(100% - 40px);
  background: #cf7ff8;
  color: white;
  font-weight: 600;
  font-size: 15px;
  margin: 5px 15px 15px;
  border-radius: 10px;
  height: 45px;
`;

const TotalDiscountForOrder = styled.div`
  margin: 15px 0 0;
  font-size: 15px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 20px;
  > div {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
`;

export const OrderModalDiscountForOrder: FC<{
  positions: IPositionForOrder[];
  onClose: () => void;
  onSave: (discount: number) => void;
}> = ({ onClose, positions, onSave }) => {
  const i18n = useTranslation();
  const [isDiscountWithPercent, setIsDiscountWithPercent] = useState<boolean>(true);
  const [activePercent, setActivePercent] = useState<number>(10);
  const [amount, setAmount] = useState<string>("");

  const totalAmountForPositions = positions.reduce((summ, position) => {
    let itemSum = 0;

    if (!position.d) {
      itemSum = Number(position.p) ?? 0;

      if (position?.v) {
        itemSum = itemSum + (Number(position.v.p) ?? 0);
      }

      if (position?.o) {
        itemSum =
          itemSum +
          (position.o.reduce((posum, po) => {
            return posum + (Number(po.p) ?? 0) * (Number(po.q) ?? 0);
          }, 0) ?? 0);
      }
    }

    return summ + itemSum;
  }, 0);

  const discountInPercent = isDiscountWithPercent
    ? activePercent
    : (Number(amount) * 100) / totalAmountForPositions;

  return (
    <WindowRests
      onClose={() => {
        onClose();
      }}
    >
      <DiscountForOrderTitle>{i18n.t("orders.discountOrderTitle")}</DiscountForOrderTitle>
      <TotalDiscountForOrder>
        <OrderModalTotalBlock positions={positions} discountInPercent={discountInPercent ?? 0} />
      </TotalDiscountForOrder>

      <DiscountForOrderTabs>
        <DiscountForOrderTab
          style={{ background: isDiscountWithPercent ? "#ede7ff" : "" }}
          onClick={() => {
            setIsDiscountWithPercent(true);
            setActivePercent(10);
          }}
        >
          {i18n.t("orders.byPerc")}
        </DiscountForOrderTab>
        <DiscountForOrderTab
          style={{ background: isDiscountWithPercent ? "" : "#ede7ff" }}
          onClick={() => {
            setIsDiscountWithPercent(false);
            setAmount("");
          }}
        >
          {i18n.t("orders.byAmou")}
        </DiscountForOrderTab>
      </DiscountForOrderTabs>
      {isDiscountWithPercent ? (
        <PercentTabs>
          {[5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100].map((p) => (
            <span
              style={{ background: activePercent !== p ? "" : "#ede7ff" }}
              onClick={() => {
                setActivePercent(p);
              }}
            >
              {p}
            </span>
          ))}
        </PercentTabs>
      ) : (
        <AmountInput
          defaultValue={amount}
          value={amount}
          placeholder={i18n.t("orders.inputAmount")}
          type="number"
          aria-controls="false"
          max={totalAmountForPositions}
          min={0}
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        />
      )}
      <ApplyDiscountButton
        onClick={() => {
          onSave(discountInPercent);
          onClose();
        }}
      >
        {i18n.t("orders.discountButton")}
      </ApplyDiscountButton>
    </WindowRests>
  );
};
