import { FC } from "react";
import { ListItem, Stack } from "@mui/material";
import { InputControlled } from "../../shared/InputControlled";
import { CheckBoxControlled } from "../../shared/CheckBoxControlled";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../app/store";
import { SelectControlled } from "../../shared/SelectControlled";

export const PositionFormGeneral: FC = () => {
  const { t } = useTranslation();
  const categories = useAppSelector((s) => s.categories.items);

  return (
    <ListItem disablePadding>
      <Stack spacing={2} width="100%">
        <SelectControlled
          name={"c"}
          label={t("positions.form.general.c")}
          options={categories?.map((c) => ({ name: c.name, code: Number(c.id) }))}
          onlyValue
        />
        <InputControlled name="n" label={t("positions.form.general.n")} />
        <InputControlled name="p" label={t("positions.form.general.p")} />
        <InputControlled name="s" label={t("positions.form.general.s")} type="number" />
        <CheckBoxControlled name="h" label={t("positions.form.general.h")} />
        <CheckBoxControlled name="a" label={t("positions.form.general.a")} />
      </Stack>
    </ListItem>
  );
};
