import { FC, useMemo } from "react";
import { useListCategoriesWithPositionsQuery } from "../api";
import { UniversalList, UniversalListItem } from "../../../app/styles";
import { IItem } from "../../../../back/types";

export const PositionSelect: FC<{
  handleSelectPosition: (position: IItem) => void;
  categoryName?: string;
}> = ({ handleSelectPosition, categoryName }) => {
  const { data } = useListCategoriesWithPositionsQuery();
  const positionsForCategory = useMemo(
    () => data?.filter((i) => categoryName === i.c)?.map((i) => i.i)?.[0] ?? [],
    [data]
  );

  return (
    <UniversalList>
      {positionsForCategory.map((i) => (
        <UniversalListItem
          key={i.n?.toString() ?? "" + i.p?.toString() ?? ""}
          onClick={() => handleSelectPosition(i)}
        >
          {i.n}
        </UniversalListItem>
      ))}
    </UniversalList>
  );
};
