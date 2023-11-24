import React from "react";
import { useAppSelector } from "../../app/store";
import { ElementsForm, ElementsList } from "../../entities/element";

export const Elements: React.FC = () => {
  const { isOpenForm } = useAppSelector((s) => s.elements);

  return <>{isOpenForm ? <ElementsForm /> : <ElementsList />}</>;
};
