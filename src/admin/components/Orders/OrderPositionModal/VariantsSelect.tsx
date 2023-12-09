import { FC } from "react";
import { IItem } from "../../../../back/types";
import { useTranslation } from "react-i18next";
import List from "../../List";

export const VariantsSelect: FC<{
  handleSelectVariant: (v: { n?: string; p?: number }) => void;
  position?: IItem;
}> = ({ handleSelectVariant, position }) => {
  const variantsWithTranslations =
    position?.v?.map((v, index) => {
      return { ...v, t: position.vt?.[index] };
    }) ?? [];
  const { i18n } = useTranslation();

  return (
    <List
      items={variantsWithTranslations.map((v, i) => {
        let title = position?.vt?.[i]?.find((t) => t.l === i18n.language)?.t;
        if (!title || title === "") {
          title = v?.n;
        }
        return {
          title,
          onClick: () => handleSelectVariant(v),
          buttonType: "next",
        };
      })}
      withPadding
    />
  );
};
