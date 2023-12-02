import { FC } from "react";
import { useTranslation } from "react-i18next";
import FormikInput from "../../shared/FormikInput";
import FormikTextarea from "../../shared/FormikTextarea";

export const CategoryFormGeneral: FC = () => {
  const { t } = useTranslation();

  return (
    <div style={{ marginTop: 10 }}>
      <FormikInput label={t("categories.form.name")} name="name" mb />
      <FormikInput label={t("categories.form.sort")} name="sort" mb type="number" />
      <FormikTextarea label={t("categories.form.description")} name="description" mb />
    </div>
  );
};
