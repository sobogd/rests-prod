import { FC } from "react";
import { OrderModalPosition } from "./OrderModalPosition";
import { UniversalList } from "../../../app/styles";
import { IPositionForOrder } from "../../../../back/types/o";

export const OrderModalList: FC<{
  setPositionForDialog: (position: IPositionForOrder) => void;
  positions: IPositionForOrder[];
  discountForOrder: number | null | undefined;
}> = ({ positions, setPositionForDialog, discountForOrder }) => {
  return (
    <UniversalList>
      {positions.map((p) => (
        <OrderModalPosition
          onClick={() => {
            setPositionForDialog(p);
          }}
          key={JSON.stringify(p)}
          position={p}
          discountInPercent={p.d ?? discountForOrder ?? 0}
        />
      ))}
    </UniversalList>
  );
};
