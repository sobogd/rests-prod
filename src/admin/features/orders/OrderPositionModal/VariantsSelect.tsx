import { FC } from "react";
import { IItem } from "../../positions/types";
import { UniversalList, UniversalListItem } from "../../../app/styles";

export const VariantsSelect: FC<{
  handleSelectVariant: (v: { n?: string; p?: number }) => void;
  position?: IItem;
}> = ({ handleSelectVariant, position }) => {
  const variantsWithTranslations =
    position?.v?.map((v, index) => {
      return { ...v, t: position.vt?.[index] };
    }) ?? [];

  return (
    <>
      <UniversalList>
        {variantsWithTranslations.map((v) => (
          <UniversalListItem onClick={() => handleSelectVariant(v)}>{v?.n}</UniversalListItem>
        ))}
      </UniversalList>
    </>
  );
};
