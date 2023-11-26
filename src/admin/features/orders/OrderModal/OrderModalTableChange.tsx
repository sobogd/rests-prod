import { FC } from "react";
import { WindowRests } from "../../../shared/WindowRests";
import { MapBlock } from "../../map/MapBlock";
import { ITableWithOrders } from "../../map/types";
import { useAllTablesQuery } from "../api";

export const OrderModalTableChange: FC<{
  onClose: () => void;
  onChangeTable: (tableId: number) => void;
}> = ({ onClose, onChangeTable }) => {
  const { data: tables } = useAllTablesQuery();

  const handleClickTable = (table: ITableWithOrders) => {
    if (table.forOrder) {
      onChangeTable(Number(table?.id));
    }
  };

  return (
    <WindowRests
      onClose={() => {
        onClose();
      }}
    >
      <MapBlock items={tables ?? []} onClickTable={handleClickTable} />
    </WindowRests>
  );
};
