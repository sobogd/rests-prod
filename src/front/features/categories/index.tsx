import React, { FC, useMemo } from "react";
import { useAppSelector } from "../../app/store";
import { ECategoriesTabs } from "./enums";
import { CategoriesList } from "./CategoriesList";
import { CategoryForm } from "./CategoryForm";

export const Categories: FC = () => {
  const tab = useAppSelector((s) => s.categories.tab);

  const renderedTab = useMemo(() => {
    switch (tab) {
      case ECategoriesTabs.LIST:
        return <CategoriesList />;
      case ECategoriesTabs.FORM:
        return <CategoryForm />;
    }
  }, [tab]);

  return renderedTab;
};
