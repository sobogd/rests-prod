import React, { FC, Fragment } from "react";
import {
  UniversalList,
  UniversalListCard,
  borderColorDefault,
  errorColor,
  prePrimaryColor,
} from "../../app/styles";
import { languages } from "../../utils/timezones";
import { IOption } from "../../app/interfaces";
import { useTranslation } from "react-i18next";
import shortid from "shortid";
import styled from "@emotion/styled";
import { useFormikContext } from "formik";
import { TbPlus, TbTrash } from "react-icons/tb";
import FormikSelect from "../../shared/FormikSelect";
import FormikInput from "../../shared/FormikInput";

const AddButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: ${prePrimaryColor};
  color: white;
  height: 45px;
  border-radius: 10px;
  font-size: 16px;
  margin-bottom: 15px;
  svg {
    height: 20px;
    width: 20px;
    margin-right: 5px;
  }
`;

const AddTranslationButton = styled(AddButton)`
  background: ${borderColorDefault};
  color: inherit;
  margin-bottom: 25px;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
`;

const VariantCard = styled(UniversalListCard)`
  float: left;
  margin: 0;
  width: 100%;
  padding: 0;
  flex-direction: row;
  font-weight: 400;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  input,
  select {
    border: 0;
  }
  > div {
    :nth-child(1) {
      width: 100%;
      input {
        border-radius: 0;
        border-top-left-radius: 10px;
        border-right: 1px solid #ede7ff;
      }
      margin-right: 1px;
    }
    :nth-child(2) {
      min-width: 100px;
      input {
        border-radius: 0;
        border-right: 1px solid #ede7ff;
      }
    }
  }
  span {
    margin: 0;
    display: flex;
    max-width: 40px;
    align-items: center;
    justify-content: center;
    min-height: 60px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 0px;
    svg {
      margin: 0;
      width: 45px;
      height: 60px;
      color: ${errorColor};
      padding: 0 10px;
    }
  }
`;

const TranslationCard = styled(VariantCard)`
  border-radius: 0;
  border-top: 0;
  select {
    border-right: 1px solid #ede7ff;
    border-radius: 0;
    max-width: 50px;
    min-width: 50px;
    text-align: center;
    padding: 0;
  }
  > div {
    :nth-child(1) {
      width: auto;
      label {
        display: none;
      }
    }
    :nth-child(2) {
      width: 100%;
      max-width: 100%;
    }
  }
  label {
    ::before {
      background: white;
    }
  }
  span {
    svg {
      color: inherit;
    }
  }
`;

export const ItemFormVariants: FC = () => {
  const { values, setValues } = useFormikContext<any>();
  const { t } = useTranslation();

  const handleAddVariant = () => {
    setValues({
      ...values,
      v: [...(values.v ?? []), { p: "", n: "", id: shortid.generate() }],
      vt: [...(values.vt ?? []), []],
    });
  };

  const handleAddTranslation = (variant_index: number) => () => {
    setValues({
      ...values,
      vt:
        values.vt?.map((item: any, index: number) =>
          index === variant_index ? [...item, { l: "en", t: "", id: shortid.generate() }] : item
        ) ?? [],
    });
  };

  const handleRemoveVariant = (variant_index: number) => () => {
    setValues({
      ...values,
      v: values.v?.filter((_: unknown, index: number) => index !== variant_index) ?? [],
      vt: values.vt?.filter((_: unknown, index: number) => index !== variant_index) ?? [],
    });
  };

  const handleRemoveTranslation = (variant_index: number, variant_translation_index: number) => () => {
    setValues({
      ...values,
      vt:
        values.vt?.map((item: any, index: number) =>
          index === variant_index
            ? item.filter((_: unknown, index: number) => index !== variant_translation_index)
            : item
        ) ?? [],
    });
  };

  return (
    <Fragment>
      <UniversalList>
        {values.v?.map((variant: { n?: string; p?: number; id?: string }, variant_index: number) => (
          <>
            <VariantCard style={variant_index === 0 ? { marginTop: 15 } : undefined}>
              <FormikInput name={`v.${variant_index}.n`} label={t("items.form.variants.name")} />
              <FormikInput
                name={`v.[${variant_index}].p`}
                type="number"
                label={t("items.form.variants.price")}
              />
              <span onClick={handleRemoveVariant(variant_index)}>
                <TbTrash />
              </span>
            </VariantCard>
            {values.vt?.[variant_index]?.map(
              (translation: { n: string; l?: IOption; id?: string }, variant_translation_index: number) => {
                return (
                  <TranslationCard>
                    <FormikSelect
                      label={t("items.form.variants.countryCode")}
                      name={`vt.[${variant_index}].[${variant_translation_index}].l`}
                      options={languages.map((l) => ({ label: l.code.toString(), value: l.code }))}
                      firstDefault
                    />
                    <FormikInput
                      name={`vt.[${variant_index}].[${variant_translation_index}].t`}
                      label={t("items.form.variants.translation") + translation.l}
                    />
                    <span onClick={handleRemoveTranslation(variant_index, variant_translation_index)}>
                      <TbTrash />
                    </span>
                  </TranslationCard>
                );
              }
            )}
            <AddTranslationButton onClick={handleAddTranslation(variant_index)}>
              <TbPlus />
              {t("items.form.variants.addTranslation")}
            </AddTranslationButton>
          </>
        ))}
      </UniversalList>
      <AddButton onClick={handleAddVariant}>
        <TbPlus />
        {t("items.form.variants.addVariant")}
      </AddButton>
    </Fragment>
  );
};
