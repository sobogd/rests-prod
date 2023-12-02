import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../app/store";
import { useFormikContext } from "formik";
import { Values } from "./ItemForm";
import FormikCheckbox from "../../shared/FormikCheckbox";
import FormikInput from "../../shared/FormikInput";
import FormikSelect from "../../shared/FormikSelect";
import { useListCategoriesQuery } from "./api";
import Loading from "../../shared/loading";

export const ItemFormGeneral: FC = () => {
  const { t } = useTranslation();
  const { data: categories, isLoading, isFetching } = useListCategoriesQuery();

  return (
    <div style={{ marginTop: 10 }}>
      <FormikSelect
        label={t("items.form.general.c")}
        name="c"
        mb
        options={categories?.map((c) => ({ label: c.name, value: Number(c.id) })) ?? []}
      />
      <Loading isLoading={isLoading || isFetching} />
      <FormikInput label={t("items.form.general.n")} name="n" mb />
      <FormikInput label={t("items.form.general.p")} name="p" mb type="number" />
      <FormikInput label={t("items.form.general.s")} name="s" mb type="number" />
      <FormikCheckbox label={t("items.form.general.h")} name="h" />
      <FormikCheckbox label={t("items.form.general.a")} name="a" mb />
    </div>
  );
};
