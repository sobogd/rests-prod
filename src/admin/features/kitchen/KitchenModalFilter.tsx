import styled from "@emotion/styled";
import { FC, useState } from "react";
import { EFilterStatuses } from "./types";
import { WindowRests } from "../../shared/WindowRests";
import { useTranslation } from "react-i18next";
import { prePrimaryColor } from "../../app/styles";

const DiscountForOrderTitle = styled.div`
  width: 100%;
  padding: 15px 20px;
  background: ${prePrimaryColor};
  font-weight: 600;
  font-size: 20px;
  color: white;
`;

const SaveButton = styled.button`
  width: calc(100% - 40px);
  background: #cf7ff8;
  color: white;
  font-weight: 600;
  font-size: 15px;
  margin: 5px 15px 15px;
  border-radius: 10px;
  height: 45px;
`;

const DiscountForOrderTabs = styled.div`
  display: flex;
  width: calc(100% - 40px);
  margin: 20px;
  border: 1px solid #ede7ff;
  border-radius: 10px;
  overflow: hidden;
`;

const DiscountForOrderTab = styled.div`
  display: flex;
  padding: 5px 10px;
  flex: 100%;
  font-size: 15px;
  border-right: 1px solid #ede7ff;
  align-items: center;
  justify-content: center;
  height: 40px;
  cursor: pointer;
  :last-child {
    border-right: 0;
  }
`;

const FilterList = styled.div`
  max-height: calc(90vh - 250px);
  overflow-y: scroll;
  width: 100%;
  padding: 5px 20px;
  margin-bottom: 20px;
`;

const FilterItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ede7ff;
  :last-child {
    border-bottom: 0;
  }
`;

const FilterName = styled.div`
  width: 100%;
  font-size: 15px;
  font-weight: 600;
  padding: 8px 15px;
  p {
    font-weight: 400;
    font-size: 15px;
    color: gray;
  }
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  overflow: hidden;
  border-radius: 5px;
  outline: none;
`;

export const KitchenModalFilter: FC<{
  filter: { status: EFilterStatuses; categoryIds: number[] };
  categories: { n: string; i: number }[];
  onClose: () => void;
  setFilter: (filter: { status: EFilterStatuses; categoryIds: number[] }) => void;
}> = ({ onClose, filter, categories, setFilter }) => {
  const [openStatusTab, setOpenStatusTab] = useState<boolean>(true);
  const [newFilter, setNewFilter] = useState<{ status: EFilterStatuses; categoryIds: number[] }>(filter);
  const i18n = useTranslation();

  return (
    <WindowRests
      onClose={() => {
        onClose();
      }}
    >
      <DiscountForOrderTitle>{i18n.t("kitchen.filterTitle")}</DiscountForOrderTitle>
      <DiscountForOrderTabs>
        <DiscountForOrderTab
          style={{ background: openStatusTab ? "#ede7ff" : "" }}
          onClick={() => {
            setOpenStatusTab(true);
          }}
        >
          {i18n.t("kitchen.filterByStat")}
        </DiscountForOrderTab>
        <DiscountForOrderTab
          style={{ background: openStatusTab ? "" : "#ede7ff" }}
          onClick={() => {
            setOpenStatusTab(false);
          }}
        >
          {i18n.t("kitchen.filterByCat")}
        </DiscountForOrderTab>
      </DiscountForOrderTabs>
      {openStatusTab ? (
        <FilterList>
          {Object.values(EFilterStatuses)?.map((status) => (
            <FilterItem>
              <Checkbox
                type="checkbox"
                checked={newFilter.status === status}
                onChange={() => {
                  setNewFilter({ ...newFilter, status });
                }}
              />
              <FilterName
                onClick={() => {
                  setNewFilter({ ...newFilter, status });
                }}
              >
                {i18n.t("kitchen.statuses." + status)}
              </FilterName>
            </FilterItem>
          ))}
        </FilterList>
      ) : (
        <FilterList>
          <FilterItem>
            <Checkbox
              type="checkbox"
              checked={newFilter.categoryIds.length === 0}
              onChange={() => {
                setNewFilter({
                  ...newFilter,
                  categoryIds: [],
                });
              }}
            />
            <FilterName
              onClick={() => {
                setNewFilter({
                  ...newFilter,
                  categoryIds: [],
                });
              }}
            >
              {i18n.t("kitchen.allCategories")}
            </FilterName>
          </FilterItem>
          {categories?.map((category) => (
            <FilterItem>
              <Checkbox
                type="checkbox"
                checked={newFilter.categoryIds.includes(category.i)}
                onChange={() => {
                  setNewFilter({
                    ...newFilter,
                    categoryIds: newFilter.categoryIds.includes(category.i)
                      ? newFilter.categoryIds.filter((id) => id !== category.i)
                      : newFilter.categoryIds.concat([category.i]),
                  });
                }}
              />
              <FilterName
                onClick={() => {
                  setNewFilter({
                    ...newFilter,
                    categoryIds: newFilter.categoryIds.includes(category.i)
                      ? newFilter.categoryIds.filter((id) => id !== category.i)
                      : newFilter.categoryIds.concat([category.i]),
                  });
                }}
              >
                {category.n}
              </FilterName>
            </FilterItem>
          ))}
        </FilterList>
      )}
      <SaveButton
        onClick={() => {
          setFilter(newFilter);
          onClose();
        }}
      >
        {i18n.t("kitchen.filterApply")}
      </SaveButton>
    </WindowRests>
  );
};
