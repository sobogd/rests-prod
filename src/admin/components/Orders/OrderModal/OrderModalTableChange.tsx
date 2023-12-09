import { FC } from "react";
import { MapBlock } from "../../Map/MapBlock";
import { ITableWithOrders } from "../../Map/types";
import { useAllTablesQuery } from "../api";
import { ModalRests } from "../../ModalRests";
import { useTranslation } from "react-i18next";

export const OrderModalTableChange: FC<{
  onClose: () => void;
  isShow?: boolean;
  onChangeTable: (tableId: number) => void;
}> = ({ onClose, onChangeTable, isShow }) => {
  const { data: tables } = useAllTablesQuery();
  const i18n = useTranslation();

  const handleClickTable = (table: ITableWithOrders) => {
    if (table.for_order) {
      onChangeTable(Number(table?.id));
    }
  };

  return (
    <ModalRests
      title={i18n.t("orders.tableChange")}
      onBack={() => onClose()}
      isAdditionalForAdditional
      isShow={isShow}
    >
      <MapBlock items={tables ?? []} onClickTable={handleClickTable} />
    </ModalRests>
  );
};
