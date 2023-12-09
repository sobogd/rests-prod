import React, { useState } from "react";
import { ModalRests } from "../ModalRests";
import { useTranslation } from "react-i18next";
import { useTablesQuery } from "./api";
import { MapForm, MapFormValues, defaultMapFormValues } from "./MapForm";
import { MapBlock } from "./MapBlock";
import { ETableType } from "../../../back/types";

export const Map: React.FC = () => {
  const i18n = useTranslation();
  const { data: tables, isLoading, isFetching, refetch } = useTablesQuery();
  const [selectedMap, setSelectedMap] = useState<number | null | undefined>(undefined);
  const [formValues, setFormValues] = useState<MapFormValues>(defaultMapFormValues);

  const handleChangeGeneralMap = (values: MapFormValues) => {
    setFormValues(values);
  };

  return (
    <>
      <ModalRests
        title={i18n.t("menu.names.TABLES")}
        isHaveMenu={true}
        footerSticks={[{ icon: "new", onClick: () => setSelectedMap(null) }]}
        isGeneral
        moreButtons={[{ title: i18n.t("map.list.update"), onClick: () => refetch() }]}
        isOpenAdditional={selectedMap !== undefined}
        isLoading={isLoading || isFetching}
      >
        <MapBlock
          items={
            selectedMap !== undefined ? (tables ?? []).filter((t) => t.id !== selectedMap) : tables ?? []
          }
          onClickTable={(table) => setSelectedMap(Number(table.id))}
          selectedTableId={selectedMap ?? undefined}
          tableForEdition={
            selectedMap !== undefined
              ? {
                  w: formValues.w ?? 0,
                  h: formValues.h ?? 0,
                  type: formValues.type ?? ETableType.TABLE_CIRCLE,
                  x: formValues.x ?? 0,
                  y: formValues.y ?? 0,
                  for_order: formValues.for_order,
                  number: formValues.number ?? 0,
                }
              : undefined
          }
        />
      </ModalRests>
      <MapForm
        selectedMapId={selectedMap}
        onBack={() => setSelectedMap(undefined)}
        refetch={refetch}
        tables={tables ?? []}
        handleChangeGeneralMap={handleChangeGeneralMap}
      />
    </>
  );
};
