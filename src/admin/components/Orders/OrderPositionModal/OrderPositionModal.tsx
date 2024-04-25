import { FC, useEffect, useState } from "react";
import { PositionSelect } from "./PositionSelect";
import { CategorySelect } from "./CategorySelect";
import { SummaryTab } from "./SummaryTab";
import { VariantsSelect } from "./VariantsSelect";
import { OptionsSelect } from "./OptionsSelect";
import { useTranslation } from "react-i18next";
import { ModalRests } from "../../ModalRests";
import { useLazyListCategoriesWithPositionsQuery } from "../api";
import {
  EPriority,
  IItem,
  IPositionForOrder,
  IVariantOrOptionForPosition,
} from "../../../../back/types";
import { errorColor, newPallet } from "../../../styles";
import { dateMs } from "../../../utils/timeInFormat";

type PositionStep =
  | "category"
  | "position"
  | "summary"
  | "options"
  | "variants";

export const OrderPositionModal: FC<{
  selectedPosition: IPositionForOrder | null | undefined;
  setSelectedPosition: (position: IPositionForOrder | null | undefined) => void;
  onClone: (position: IPositionForOrder | null | undefined) => void;
  onRemove: (position: IPositionForOrder | null | undefined) => void;
}> = ({ setSelectedPosition, selectedPosition, onClone, onRemove }) => {
  const [step, setStep] = useState<PositionStep | undefined>(undefined);
  const [comment, setComment] = useState<string | undefined>();
  const [variant, setVariant] = useState<
    IVariantOrOptionForPosition | undefined
  >();
  const [options, setOptions] = useState<
    IVariantOrOptionForPosition[] | undefined
  >();
  const [categoryName, setCategoryName] = useState<string | undefined>();
  const [position, setPosition] = useState<IItem | undefined>();
  const [percent, setPercent] = useState<number>(0);
  const [priority, setPriority] = useState<EPriority | undefined>(undefined);
  const i18n = useTranslation();
  const [loadPositions, { data }] = useLazyListCategoriesWithPositionsQuery();

  useEffect(() => {
    loadPositions();
  }, []);

  useEffect(() => {
    if (
      selectedPosition !== undefined &&
      selectedPosition !== null &&
      selectedPosition?.i !== undefined
    ) {
      setStep("summary");
      if (selectedPosition?.v) {
        setVariant(selectedPosition?.v);
      }
      if (selectedPosition?.o?.length) {
        setOptions(selectedPosition?.o);
      }
      if (selectedPosition.c) {
        setComment(selectedPosition.c);
      }
      setPercent(selectedPosition.d ?? 0);
      setPriority(selectedPosition.pr ?? undefined);
      const position = data
        ?.filter((d) => d.i.find((dd) => dd.n === selectedPosition?.n))?.[0]
        ?.i?.find((dd) => dd.n === selectedPosition?.n);
      setPosition(position);
      setCategoryName(
        data?.filter((d) => d.i.find((dd) => dd.n === selectedPosition?.n))?.[0]
          .c ?? ""
      );
    } else if (selectedPosition === null) {
      setStep("category");
      setOptions(undefined);
      setVariant(undefined);
      setCategoryName(undefined);
      setComment(undefined);
      setPriority(undefined);
      setPercent(0);
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
      case "summary":
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
      case "summary":
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
          setPriority(undefined);
          setPercent(0);
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
                setStep("summary");
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
                setStep("summary");
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
      case "summary":
        return (
          <SummaryTab
            comment={comment}
            setComment={setComment}
            percent={percent}
            setPercent={setPercent}
            priority={priority}
            setPriority={setPriority}
          />
        );
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

  const getFooterSticksForStep = (): any => {
    switch (step) {
      case "position":
        return undefined;
      case "variants":
        return undefined;
      case "options":
        return [
          {
            icon: "next",
            onClick: () => {
              setStep("summary");
            },
          },
        ];
      case "summary":
        return [
          {
            icon: "save",
            onClick: () => {
              setSelectedPosition({
                id: position?.id,
                n: position?.n,
                p: position?.p,
                v: variant,
                o: options,
                t: position?.t,
                c: comment,
                i: selectedPosition?.i ?? undefined,
                cat: Number(position?.c) ?? 0,
                crt: dateMs(),
                pr: priority,
                d: percent,
              });
              setOptions(undefined);
              setVariant(undefined);
              setPosition(undefined);
              setCategoryName(undefined);
              setComment(undefined);
              setPriority(undefined);
              setPercent(0);
            },
          },
        ].concat(
          selectedPosition != null
            ? [
                {
                  icon: "copy",
                  // @ts-expect-error
                  iconColor: newPallet.orange1,
                  onClick: () => onClone(selectedPosition),
                },
                {
                  icon: "trash",
                  iconColor: errorColor,
                  onClick: () => onRemove(selectedPosition),
                },
              ]
            : []
        );
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
        setPriority(undefined);
        setPercent(0);
        setSelectedPosition(undefined);
      }}
      footerSticks={getFooterSticksForStep()}
      isAdditionalForAdditional
      isShow={selectedPosition !== undefined ? true : false}
    >
      {getPageForRender()}
    </ModalRests>
  );
};
