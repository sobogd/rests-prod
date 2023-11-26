import { FC, useMemo } from "react";
import { useListCategoriesWithPositionsQuery } from "../api";
import { UniversalList, UniversalListItem } from "../../../app/styles";

export const CategorySelect: FC<{
  handleSelectCategory: (categoryName: string) => void;
}> = ({ handleSelectCategory }) => {
  const { data } = useListCategoriesWithPositionsQuery();
  const categorieNames = useMemo(() => data?.map((i) => i.c) ?? [], [data]);

  return (
    <UniversalList>
      {categorieNames.map((name) => (
        <UniversalListItem onClick={() => handleSelectCategory(name)} key={name}>
          {name}
        </UniversalListItem>
      ))}
    </UniversalList>
  );
};
