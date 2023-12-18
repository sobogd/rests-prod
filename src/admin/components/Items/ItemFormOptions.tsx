import { FC } from "react";
import { useTranslation } from "react-i18next";
import shortid from "shortid";
import { useFormikContext } from "formik";
import styled from "@emotion/styled";
import FormikInput from "../FormikInput";
import { TbPlus, TbTrash } from "react-icons/tb";
import { useAuth } from "../Auth/Context";
import { textDefaultColor, newBorderColor, errorColor } from "../../styles";
import { IOption } from "../../types";

const AddButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: ${textDefaultColor};
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

const Option = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 0 15px 0;
  > div {
    :not(:first-child) {
      border-top: 0;
      border-radius: 0;
      input {
        border-radius: 0;
      }
      label {
        ::before {
          background-color: white;
        }
      }
    }
    :last-child {
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      input {
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
      }
    }
    :first-child {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
    display: flex;
    flex-direction: row;
    width: 100%;
    background: white;
    border-radius: 10px;
    border: 1px solid ${newBorderColor};
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
      max-width: 50px;
      min-width: 50px;
      padding: 5px;
      align-items: center;
      justify-content: center;
      min-height: 50px;
      max-height: 50px;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 0px;
      svg {
        margin: 0;
        width: 50px;
        height: 50px;
        color: ${errorColor};
        padding: 0 10px;
      }
    }
  }
`;

export const ItemFormOptions: FC = () => {
  const { values, setValues } = useFormikContext<any>();
  const { t } = useTranslation();

  const langs = useAuth()?.whoami?.company?.langs ?? [];
  const lang = useAuth()?.whoami?.company?.lang ?? "en";

  const handleAddOption = () => {
    setValues({
      ...values,
      o: [...(values.o ?? []), { p: "", n: "", id: shortid.generate() }],
      ot: [...(values.ot ?? []), langs.map((lang) => ({ l: lang, t: "" }))],
    });
  };

  const handleRemoveOption = (option_index: number) => () => {
    setValues({
      ...values,
      o: values.o?.filter((_: unknown, index: number) => index !== option_index) ?? [],
      ot: values.ot?.filter((_: unknown, index: number) => index !== option_index) ?? [],
    });
  };

  return (
    <>
      {values.o?.map((option: { n?: string; p?: number; id?: string }, option_index: number) => (
        <Option>
          <div style={option_index === 0 ? { marginTop: 15 } : undefined}>
            <FormikInput name={`o.[${option_index}].n`} label={t("items.form.options.name") + lang} />
            <span onClick={handleRemoveOption(option_index)}>
              <TbTrash />
            </span>
          </div>
          {values.ot?.[option_index]?.map(
            (translation: { n: string; l?: IOption; id?: string }, option_translation_index: number) => {
              return (
                <FormikInput
                  name={`ot.[${option_index}].[${option_translation_index}].t`}
                  label={t("items.form.options.translation") + translation.l}
                />
              );
            }
          )}
          <FormikInput name={`o.[${option_index}].p`} type="number" label={t("items.form.options.price")} />
        </Option>
      ))}
      <AddButton onClick={handleAddOption}>
        <TbPlus />
        {t("items.form.options.addOption")}
      </AddButton>
    </>
  );
};
