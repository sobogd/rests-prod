import { FC, useMemo } from "react";
import { useListCategoriesWithPositionsQuery } from "../api";
import { IItem } from "../../../../back/types";
import { useTranslation } from "react-i18next";
import List from "../../List";

export const PositionSelect: FC<{
  handleSelectPosition: (position: IItem) => void;
  categoryName?: string;
}> = ({ handleSelectPosition, categoryName }) => {
  const { data } = useListCategoriesWithPositionsQuery();
  const positionsForCategory = useMemo(
    () => data?.filter((i) => categoryName === i.c)?.map((i) => i.i)?.[0] ?? [],
    [data]
  );
  const { i18n } = useTranslation();

  return (
    <List
      items={positionsForCategory.map((i) => {
        let title = i?.t?.find((t) => t.l === i18n.language)?.t;
        if (!title || title === "") {
          title = i.n;
        }
        return {
          title,
          onClick: () => handleSelectPosition(i),
          buttonType: "next",
        };
      })}
      withPadding
    />
  );
};
