import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useFormikContext } from "formik";
import FormikInput from "../FormikInput";
import styled from "@emotion/styled";
import { TbPlus, TbTrash } from "react-icons/tb";
import { useAuth } from "../Auth/Context";
import { textDefaultColor, UniversalListCard, backgroundDefault, UniversalList } from "../../styles";

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

const RemoveButton = styled.div`
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
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
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
  :last-child {
    margin-bottom: 0;
  }
  :first-child {
    input {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
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
  :not(:first-child) {
    label {
      ::before {
        background: white !important;
      }
    }
  }
  font-weight: 400;
  input {
    border: 0;
    border-radius: 0;
  }
  > div {
    margin-right: 1px;
    width: 100%;
  }
`;

export const CategoryFormTranslation: FC = () => {
  const { values, setFieldValue } = useFormikContext<any>();
  const i18n = useTranslation();

  const langs = useAuth()?.whoami?.company?.langs ?? [];

  const handleAddTranslation = () => {
    setFieldValue(
      "translations",
      langs.map((lang) => ({ l: lang, t: "" }))
    );
  };

  const handleRemoveTranslation = () => {
    setFieldValue("translations", []);
  };

  return (
    <>
      <UniversalList>
        {values.translations?.map((translation: { l?: string; p?: number }, idx: number) => (
          <TranslationCard key={translation.l}>
            <FormikInput
              name={`translations.[${idx}].t`}
              label={i18n.t("categories.form.translations.translation") + translation?.l}
            />
          </TranslationCard>
        ))}
      </UniversalList>
      {values.translations?.length > 0 ? (
        <RemoveButton onClick={handleRemoveTranslation}>
          <TbTrash />
          {i18n.t("categories.form.translations.removeTranslation")}
        </RemoveButton>
      ) : (
        <AddButton onClick={handleAddTranslation}>
          <TbPlus />
          {i18n.t("categories.form.translations.addTranslation")}
        </AddButton>
      )}
    </>
  );
};
