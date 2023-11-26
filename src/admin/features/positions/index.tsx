import React, { FC, useMemo } from "react";
import { useAppSelector } from "../../app/store";
import { EPositionsTabs } from "./enums";
import { CategoriesFilter } from "./CategoriesFilter";
import { PositionsList } from "./PositionsList";
import { PositionsForm } from "./PositionsForm";

export const Positions: FC = () => {
  const tab = useAppSelector((s) => s.positions.tab);

  const renderedTab = useMemo(() => {
    switch (tab) {
      case EPositionsTabs.CATEGORIES:
        return <CategoriesFilter />;
      case EPositionsTabs.POSITIONS:
        return <PositionsList />;
      case EPositionsTabs.FORM:
        return <PositionsForm />;
    }
  }, [tab]);

  return renderedTab;
};
