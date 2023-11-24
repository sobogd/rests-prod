import styled from "@emotion/styled";
import { FC, useState } from "react";
import { OrderModalPosition } from "./OrderModalPosition";
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

const SplitButton = styled.button`
  width: calc(100% - 40px);
  background: #cf7ff8;
  color: white;
  font-weight: 600;
  font-size: 15px;
  margin: 5px 15px 15px;
  border-radius: 10px;
  height: 45px;
`;

const SplittingList = styled.div`
  max-height: calc(90vh - 100px);
  overflow-y: scroll;
  width: 100%;
  padding: 0 20px;
`;

const SplittingItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ede7ff;
  :last-child {
    border-bottom: 0;
  }
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  overflow: hidden;
  border-radius: 5px;
  outline: none;
`;

export const OrderModalSplitting: FC<{
  positions: IPositionForOrder[];
  onClose: () => void;
  onSplit: (positions: number[]) => void;
}> = ({ onClose, positions, onSplit }) => {
  const i18n = useTranslation();
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);

  const handleClickCheckbox = (position: IPositionForOrder) => () =>
    setSelectedIndexes(
      selectedIndexes.includes(position.i ?? -5)
        ? selectedIndexes.filter((i) => i !== position.i)
        : selectedIndexes.concat([position.i ?? -5])
    );

  return (
    <WindowRests
      onClose={() => {
        onClose();
      }}
    >
      <DiscountForOrderTitle>{i18n.t("orders.splitTitle")}</DiscountForOrderTitle>
      <SplittingList>
        {positions?.map((position) => (
          <SplittingItem>
            <Checkbox
              type="checkbox"
              checked={selectedIndexes.includes(position.i ?? -5)}
              onChange={handleClickCheckbox(position)}
            />
            <OrderModalPosition
              onClick={handleClickCheckbox(position)}
              position={position}
              discountInPercent={0}
              hidePrices
              hideBorder
            />
          </SplittingItem>
        ))}
      </SplittingList>
      <SplitButton
        onClick={() => {
          if (selectedIndexes.length > 0 && selectedIndexes.length !== positions.length) {
            onSplit(selectedIndexes);
            onClose();
          }
        }}
      >
        {i18n.t("orders.splitButton")}
      </SplitButton>
    </WindowRests>
  );
};
