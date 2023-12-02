import { FC } from "react";
import { languages } from "../../utils/timezones";
import { useTranslation } from "react-i18next";
import shortid from "shortid";
import { useFormikContext } from "formik";
import FormikSelect from "../../shared/FormikSelect";
import FormikInput from "../../shared/FormikInput";
import styled from "@emotion/styled";
import { TbPlus, TbTrash } from "react-icons/tb";
import {
  UniversalList,
  UniversalListCard,
  backgroundDefault,
  borderColorDefault,
  errorColor,
  prePrimaryColor,
} from "../../app/styles";

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

const TranslationCard = styled(UniversalListCard)`
  float: left;
  margin: 0;
  width: 100%;
  padding: 0;
  flex-direction: row;
  border-top: 0;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-radius: 0;
  label {
    ::before {
      background: white;
    }
  }
  :nth-child(1) {
    border-top: 1px solid #ede7ff;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    label {
      ::before {
        background: ${backgroundDefault};
      }
    }
  }
  :last-child {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  input,
  select {
    border: 0;
  }
  font-weight: 400;
  select {
    border-right: 1px solid ${borderColorDefault};
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    max-width: 50px;
    min-width: 50px;
    text-align: center;
    padding: 0;
    text-align: center;
  }
  input {
    border-radius: 0;
    border-right: 1px solid ${borderColorDefault};
  }
  > div {
    :nth-child(1) {
      margin-right: 1px;
      label {
        display: none;
      }
    }
    :nth-child(2) {
      width: 100%;
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

export const CategoryFormTranslation: FC = () => {
  const { values, setValues } = useFormikContext<any>();
  const i18n = useTranslation();

  const handleAddTranslation = () => {
    setValues({
      ...values,
      translations: [...(values.translations ?? []), { l: "en", t: "", id: shortid.generate() }],
    });
  };

  const handleRemoveTranslation = (idx: number) => () => {
    setValues({
      ...values,
      translations: (values.translations ?? []).filter((_: unknown, index: number) => index !== idx),
    });
  };

  return (
    <>
      <UniversalList>
        {values.translations?.map((translation: { l?: string; p?: number; id?: string }, idx: number) => (
          <TranslationCard>
            <FormikSelect
              label={i18n.t("categories.form.translations.countryCode")}
              name={`translations.[${idx}].l`}
              options={languages.map((l) => ({ label: l.code.toString(), value: l.code }))}
              firstDefault
            />
            <FormikInput
              name={`translations.[${idx}].t`}
              label={i18n.t("categories.form.translations.translation") + translation?.l}
            />
            <span onClick={handleRemoveTranslation(idx)}>
              <TbTrash />
            </span>
          </TranslationCard>
        ))}
      </UniversalList>
      <AddButton onClick={handleAddTranslation}>
        <TbPlus />
        {i18n.t("categories.form.translations.addTranslation")}
      </AddButton>
    </>
  );
};
