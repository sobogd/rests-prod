import { FC } from "react";
import { useTranslation } from "react-i18next";
import FormikCheckbox from "../Checkbox/FormikCheckbox";
import FormikInput from "../FormikInput";
import FormikSelect from "../Select/FormikSelect";
import { useListCategoriesQuery } from "./api";
import Loading from "../loading";
import { useAuth } from "../Auth/Context";
import { useFormikContext } from "formik";
import { InputGroup } from "../../styles";

export const ItemFormGeneral: FC = () => {
  const { t, i18n } = useTranslation();
  const { data: categories, isLoading, isFetching } = useListCategoriesQuery();
  const { values } = useFormikContext();

  const lang = useAuth()?.whoami?.company?.lang ?? "en";
  const langs = useAuth()?.whoami?.company?.langs ?? [];

  return (
    <div style={{ marginTop: 10 }}>
      <FormikSelect
        label={t("items.form.general.c")}
        name="c"
        mb
        options={categories?.map((c) => ({ label: c.name, value: Number(c.id) })) ?? []}
      />
      <Loading isLoading={isLoading || isFetching} />
      <InputGroup>
        <FormikInput name={`n`} label={t("items.form.general.non") + lang} />
        {(values as any).t?.map((translation: { l?: string; p?: number }, idx: number) => (
          <FormikInput
            name={`t.[${idx}].t`}
            label={t("items.form.translations.translation") + translation?.l}
          />
        ))}
      </InputGroup>
      <FormikInput label={t("items.form.general.p")} name="p" mb type="number" />
      <FormikInput label={t("items.form.general.s")} name="s" mb type="number" />
      <FormikCheckbox label={t("items.form.general.h")} name="h" />
      <FormikCheckbox label={t("items.form.general.a")} name="a" mb />
    </div>
  );
};
