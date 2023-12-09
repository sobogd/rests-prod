import { FC } from "react";
import { languages } from "../../utils/timezones";
import { useTranslation } from "react-i18next";
import { useFormikContext } from "formik";
import FormikSelect from "../Select/FormikSelect";
import styled from "@emotion/styled";
import { TbPlus, TbTrash } from "react-icons/tb";
import {
  textDefaultColor,
  UniversalListCard,
  backgroundDefault,
  errorColor,
  UniversalList,
  newBorderColor,
} from "../../styles";

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
  font-weight: 400;
  select {
    border: 0;
    border-right: 1px solid ${newBorderColor};
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  > div {
    :nth-child(1) {
      margin-right: 1px;
      width: 100%;
    }
  }
  label {
    display: none;
  }
  :nth-child(1) {
    label {
      display: flex;
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

export const CompanyTranslation: FC = () => {
  const { values, setValues } = useFormikContext<any>();
  const i18n = useTranslation();

  const langsWithoutExists = languages.filter(
    (l) => !values?.langs?.includes(l.code) && values?.lang !== l.code
  );

  const handleAddTranslation = () => {
    setValues({
      ...values,
      langs: [...(values.langs ?? []), langsWithoutExists[0].code],
    });
  };

  const handleRemoveTranslation = (idx: number) => () => {
    setValues({
      ...values,
      langs: (values.langs ?? []).filter((_: unknown, index: number) => index !== idx),
    });
  };

  return (
    <>
      <UniversalList>
        {(values.langs ?? []).map((lang: string, idx: number) => (
          <TranslationCard>
            <FormikSelect
              label={i18n.t("company.translation.select")}
              name={`langs.[${idx}]`}
              options={langsWithoutExists
                .concat(languages.filter((l) => l.code === lang) ?? [])
                .map((l) => ({ label: l.name, value: l.code }))}
              firstDefault
            />
            <span onClick={handleRemoveTranslation(idx)}>
              <TbTrash />
            </span>
          </TranslationCard>
        ))}
      </UniversalList>
      <AddButton onClick={handleAddTranslation}>
        <TbPlus />
        {i18n.t("company.translation.add")}
      </AddButton>
    </>
  );
};
