import { FC, useEffect, useState } from "react";
import { PositionSelect } from "./PositionSelect";
import { CategorySelect } from "./CategorySelect";
import { CommentTab } from "./CommentTab";
import { IItem } from "../../positions/types";
import { VariantsSelect } from "./VariantsSelect";
import { OptionsSelect } from "./OptionsSelect";
import { useTranslation } from "react-i18next";
import { ModalRests } from "../../../shared/ModalRests";
import { useListCategoriesWithPositionsQuery } from "../api";
import { utcToZonedTime } from "date-fns-tz";
import { IPositionForOrder, IVariantOrOptionForPosition } from "../../../../back/types/o";

type PositionStep = "category" | "position" | "comment" | "options" | "variants";

export const OrderPositionModal: FC<{
  selectedPosition: IPositionForOrder | null | undefined;
  setSelectedPosition: (position: IPositionForOrder | null | undefined) => void;
}> = ({ setSelectedPosition, selectedPosition }) => {
  const [step, setStep] = useState<PositionStep | undefined>(undefined);
  const [comment, setComment] = useState<string | undefined>();
  const [variant, setVariant] = useState<IVariantOrOptionForPosition | undefined>();
  const [options, setOptions] = useState<IVariantOrOptionForPosition[] | undefined>();
  const [categoryName, setCategoryName] = useState<string | undefined>();
  const [position, setPosition] = useState<IItem | undefined>();
  const i18n = useTranslation();
  const { data } = useListCategoriesWithPositionsQuery();

  useEffect(() => {
    if (selectedPosition !== undefined && selectedPosition !== null && selectedPosition?.i !== undefined) {
      setStep("comment");
      if (selectedPosition?.v) {
        setVariant(selectedPosition?.v);
      }
      if (selectedPosition?.o?.length) {
        setOptions(selectedPosition?.o);
      }
      if (selectedPosition.c) {
        setComment(selectedPosition.c);
      }
      setPosition(
        data
          ?.filter((d) => d.i.find((dd) => dd.n === selectedPosition?.n))?.[0]
          ?.i?.find((dd) => dd.n === selectedPosition?.n)
      );
    } else if (selectedPosition === null) {
      setStep("category");
    }
  }, [selectedPosition]);

  const getTitleForStep = () => {
    switch (step) {
      case "position":
        return i18n.t("orders.posModPosTitle");
      case "variants":
        return i18n.t("orders.posModVarTitle");
      case "options":
        return i18n.t("orders.posModOptTitle");
      case "comment":
        return i18n.t("orders.posModComTitle");
      default:
        return i18n.t("orders.posModCatTitle");
    }
  };

  const getBackActionForStep = () => {
    switch (step) {
      case "position":
        return () => {
          setOptions(undefined);
          setVariant(undefined);
          setPosition(undefined);
          setStep("category");
        };
      case "variants":
        return () => {
          setOptions(undefined);
          setVariant(undefined);
          setStep("position");
        };
      case "options":
        return () => {
          setOptions(undefined);
          if (!!position?.v?.length) {
            setStep("variants");
          } else {
            setStep("position");
          }
        };
      case "comment":
        return () => {
          if (!!position?.o?.length) {
            setStep("options");
          } else if (!!position?.v?.length) {
            setStep("variants");
          } else {
            setStep("position");
          }
        };
      default:
        return () => {
          setOptions(undefined);
          setVariant(undefined);
          setPosition(undefined);
          setCategoryName(undefined);
          setComment(undefined);
          setSelectedPosition(undefined);
        };
    }
  };

  const getPageForRender = () => {
    switch (step) {
      case "position":
        return (
          <PositionSelect
            handleSelectPosition={(position: IItem) => {
              setPosition(position);
              if (!!position?.v?.length) {
                setStep("variants");
              } else if (!!position?.o?.length) {
                setStep("options");
              } else {
                setStep("comment");
              }
            }}
            categoryName={categoryName}
          />
        );
      case "variants":
        return (
          <VariantsSelect
            handleSelectVariant={(variant: { n?: string; p?: number }) => {
              setVariant(variant);
              if (!!position?.o?.length) {
                setStep("options");
              } else {
                setStep("comment");
              }
            }}
            position={position}
          />
        );
      case "options":
        return (
          <OptionsSelect
            position={position}
            options={options}
            handleChangeOptions={(newOptions) => {
              setOptions(newOptions);
            }}
          />
        );
      case "comment":
        return <CommentTab comment={comment} setComment={setComment} />;
      case "category":
        return (
          <CategorySelect
            handleSelectCategory={(categoryName: string) => {
              setCategoryName(categoryName);
              setStep("position");
            }}
          />
        );
      default:
        return null;
    }
  };

  const getFooterButtonsForStep = () => {
    switch (step) {
      case "position":
        return undefined;
      case "variants":
        return undefined;
      case "options":
        return {
          title: i18n.t("orders.next"),
          onClick: () => {
            setStep("comment");
          },
        };
      case "comment":
        return {
          title: i18n.t("orders.save"),
          onClick: () => {
            setSelectedPosition({
              n: position?.n,
              p: position?.p,
              v: variant,
              o: options,
              t: position?.t,
              c: comment,
              i: selectedPosition?.i ?? undefined,
              cat: position?.c ?? 0,
              crt: utcToZonedTime(new Date(), "UTC").valueOf(),
            });
            setOptions(undefined);
            setVariant(undefined);
            setPosition(undefined);
            setCategoryName(undefined);
            setComment(undefined);
          },
        };
      default:
        return undefined;
    }
  };

  return (
    <ModalRests
      title={getTitleForStep()}
      onBack={getBackActionForStep()}
      onClose={() => {
        setOptions(undefined);
        setVariant(undefined);
        setPosition(undefined);
        setCategoryName(undefined);
        setComment(undefined);
        setSelectedPosition(undefined);
      }}
      footerButton={getFooterButtonsForStep()}
    >
      {getPageForRender()}
    </ModalRests>
  );
};
