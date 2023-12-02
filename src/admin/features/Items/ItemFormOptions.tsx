import { FC, Fragment } from "react";
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
import { useFormikContext } from "formik";
import styled from "@emotion/styled";
import FormikSelect from "../../shared/FormikSelect";
import FormikInput from "../../shared/FormikInput";
import { TbPlus, TbTrash } from "react-icons/tb";

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

const OptionCard = styled(UniversalListCard)`
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

const TranslationCard = styled(OptionCard)`
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

export const ItemFormOptions: FC = () => {
  const { values, setValues } = useFormikContext<any>();
  const { t } = useTranslation();

  const handleAddOption = () => {
    setValues({
      ...values,
      o: [...(values.o ?? []), { p: "", n: "", id: shortid.generate() }],
      ot: [...(values.ot ?? []), []],
    });
  };

  const handleAddTranslation = (option_index: number) => () => {
    setValues({
      ...values,
      ot:
        values.ot?.map((item: any, index: number) =>
          index === option_index ? [...item, { l: "en", t: "", id: shortid.generate() }] : item
        ) ?? [],
    });
  };

  const handleRemoveOption = (option_index: number) => () => {
    setValues({
      ...values,
      o: values.o?.filter((_: unknown, index: number) => index !== option_index) ?? [],
      ot: values.ot?.filter((_: unknown, index: number) => index !== option_index) ?? [],
    });
  };

  const handleRemoveTranslation = (option_index: number, option_translation_index: number) => () => {
    setValues({
      ...values,
      ot:
        values.ot?.map((item: any, index: number) =>
          index === option_index
            ? item.filter((_: unknown, index: number) => index !== option_translation_index)
            : item
        ) ?? [],
    });
  };

  return (
    <Fragment>
      <UniversalList>
        {values.o?.map((option: { n?: string; p?: number; id?: string }, option_index: number) => (
          <>
            <OptionCard style={option_index === 0 ? { marginTop: 15 } : undefined}>
              <FormikInput name={`o.[${option_index}].n`} label={t("items.form.options.name")} />
              <FormikInput
                name={`o.[${option_index}].p`}
                type="number"
                label={t("items.form.options.price")}
              />
              <span onClick={handleRemoveOption(option_index)}>
                <TbTrash />
              </span>
            </OptionCard>
            {values.ot?.[option_index]?.map(
              (translation: { n: string; l?: IOption; id?: string }, option_translation_index: number) => {
                return (
                  <TranslationCard>
                    <FormikSelect
                      label={t("items.form.options.countryCode")}
                      name={`ot.[${option_index}].[${option_translation_index}].l`}
                      options={languages.map((l) => ({ label: l.code.toString(), value: l.code }))}
                      firstDefault
                    />
                    <FormikInput
                      name={`ot.[${option_index}].[${option_translation_index}].t`}
                      label={t("items.form.options.translation") + translation.l}
                    />
                    <span onClick={handleRemoveTranslation(option_index, option_translation_index)}>
                      <TbTrash />
                    </span>
                  </TranslationCard>
                );
              }
            )}
            <AddTranslationButton onClick={handleAddTranslation(option_index)}>
              <TbPlus />
              {t("items.form.variants.addTranslation")}
            </AddTranslationButton>
          </>
        ))}
      </UniversalList>
      <AddButton onClick={handleAddOption}>
        <TbPlus />
        {t("items.form.options.addOption")}
      </AddButton>
    </Fragment>
  );
};
