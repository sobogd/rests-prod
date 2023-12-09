import { FC, useMemo } from "react";
import { useListCategoriesWithPositionsQuery } from "../api";
import List from "../../List";

export const CategorySelect: FC<{
  handleSelectCategory: (categoryName: string) => void;
}> = ({ handleSelectCategory }) => {
  const { data } = useListCategoriesWithPositionsQuery();
  const categorieNames = useMemo(() => data?.map((i) => i.c) ?? [], [data]);

  return (
    <List
      items={categorieNames.map((title) => ({
        title,
        onClick: () => handleSelectCategory(title),
        buttonType: "next",
      }))}
      withPadding
    />
  );
};
