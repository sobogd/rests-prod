import { FC } from "react";
import { OrderModalTotalBlock } from "./OrderModalTotalBlock";
import List from "../../List";
import { useAuth } from "../../Auth/Context";
import { IPositionForOrder } from "../../../../back/types";
import { getPositionTitleForList } from "../../../utils/getPositionTitleForList";
import { getPositionDescriptionForList } from "../../../utils/getPositionDescriptionForList";

export const OrderModalList: FC<{
  setSelectedPosition: (position: IPositionForOrder) => void;
  onClickTotalBlcok: () => void;
  positions: IPositionForOrder[];
  discountForOrder: number | null | undefined;
}> = ({ positions, setSelectedPosition, discountForOrder, onClickTotalBlcok }) => {
  const symbol = useAuth()?.whoami?.company?.symbol;

  return (
    <>
      <List
        items={positions.map((p) => ({
          title: getPositionTitleForList(p, discountForOrder ?? 0, symbol, "price"),
          description: getPositionDescriptionForList(p),
          buttonType: "next",
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
