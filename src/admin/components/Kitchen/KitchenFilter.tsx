import styled from "@emotion/styled";
import { FC, useState } from "react";
import { EFilterStatuses } from "./types";
import { useTranslation } from "react-i18next";
import { ModalRests } from "../ModalRests";
import Checkbox from "../Checkbox/Checkbox";

const FilterList = styled.div`
  width: 100%;
  margin-bottom: 15px;
  span {
    display: flex;
    width: 100%;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 15px;
  }
`;

export const KitchenFilter: FC<{
  filter: { status: EFilterStatuses; categoryIds: number[] };
  categories: { n: string; i: number }[];
  onClose: () => void;
  isShow?: boolean;
  setFilter: (filter: { status: EFilterStatuses; categoryIds: number[] }) => void;
}> = ({ onClose, filter, categories, setFilter, isShow }) => {
  const [newFilter, setNewFilter] = useState<{ status: EFilterStatuses; categoryIds: number[] }>(filter);
  const i18n = useTranslation();

  return (
    <ModalRests
      title={i18n.t("kitchen.filterTitle")}
      onClose={() => onClose()}
      isShow={!!isShow}
      footerSticks={[
        {
          icon: "save",
          onClick: () => {
            setFilter(newFilter);
            onClose();
          },
        },
      ]}
      withPadding
    >
      <FilterList>
        <span>{i18n.t("kitchen.filterByStat")}</span>
        {Object.values(EFilterStatuses)?.map((status) => (
          <Checkbox
            value={newFilter.status === status}
            onChange={() => setNewFilter({ ...newFilter, status })}
            label={i18n.t("kitchen.statuses." + status)}
          />
        ))}
      </FilterList>
      <FilterList>
        <span>{i18n.t("kitchen.filterByCat")}</span>
        <Checkbox
          value={newFilter.categoryIds.length === 0}
          onChange={() =>
            setNewFilter({
              ...newFilter,
              categoryIds: [],
            })
          }
          label={i18n.t("kitchen.allCategories")}
        />
        {categories?.map((category) => (
          <Checkbox
            value={newFilter.categoryIds.includes(category.i)}
            onChange={() =>
              setNewFilter({
                ...newFilter,
                categoryIds: newFilter.categoryIds.includes(category.i)
                  ? newFilter.categoryIds.filter((id) => id !== category.i)
                  : newFilter.categoryIds.concat([category.i]),
              })
            }
            label={category.n}
          />
        ))}
      </FilterList>
    </ModalRests>
  );
};
