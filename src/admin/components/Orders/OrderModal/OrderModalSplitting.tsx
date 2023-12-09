import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { IPositionForOrder } from "../../../../back/types";
import { ModalRests } from "../../ModalRests";
import List from "../../List";
import { getPositionTitleForList } from "../../../utils/getPositionTitleForList";
import { getPositionDescriptionForList } from "../../../utils/getPositionDescriptionForList";
import Checkbox from "../../Checkbox/Checkbox";
import { Notice } from "../../../hooks/useNotification";

export const OrderModalSplitting: FC<{
  positions: IPositionForOrder[];
  onClose: () => void;
  onSplit: (positions: number[]) => void;
  isShow?: boolean;
}> = ({ onClose, positions, onSplit, isShow }) => {
  const i18n = useTranslation();
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);

  const handleClickCheckbox = (position: IPositionForOrder) =>
    setSelectedIndexes(
      selectedIndexes.includes(position.i ?? -5)
        ? selectedIndexes.filter((i) => i !== position.i)
        : selectedIndexes.concat([position.i ?? -5])
    );

  return (
    <ModalRests
      title={i18n.t("orders.splitTitle")}
      onBack={() => onClose()}
      footerSticks={[
        {
          icon: "save",
          onClick: () => {
            if (selectedIndexes.length > 0 && selectedIndexes.length !== positions.length) {
              onSplit(selectedIndexes);
              onClose();
            } else {
              Notice.warning(i18n.t("orders.splitOrderMin"));
            }
          },
        },
      ]}
      isAdditionalForAdditional
      isShow={isShow}
      withPadding
    >
      <List
        items={positions.map((p) => ({
          title: (
            <Checkbox
              label={getPositionTitleForList(p, 0, "")}
              value={selectedIndexes.includes(p.i ?? -5)}
              onChange={() => handleClickCheckbox(p)}
            />
          ),
          description: getPositionDescriptionForList(p),
          onClick: () => {},
          id: JSON.stringify(p),
        }))}
      />
    </ModalRests>
  );
};
