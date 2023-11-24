import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { Button, ListItem, Stack } from "@mui/material";
import { Header } from "../../shared/Header";
import { SelectControlled } from "../../shared/SelectControlled";
import { borderColorDefault } from "../../app/styles";
import { InputControlled } from "../../shared/InputControlled";
import { languages } from "../../utils/timezones";
import DeleteIcon from "@mui/icons-material/Delete";
import { IOption } from "../../app/interfaces";

export const CategoriesFormTranslation: FC = () => {
  const { watch, setValue } = useFormContext();
  const translations = watch("translations");

  const handleAddTranslation = () => {
    setValue("translations", [...translations, { code: undefined, name: "" }]);
  };

  const handleRemoveTranslation = (idx: number) => () => {
    setValue(
      "translations",
      translations.filter((_: unknown, id: number) => id !== idx)
    );
  };

  return (
    <ListItem disablePadding>
      <Stack spacing={2} width="100%">
        <Header
          title="Translation"
          subtitle="Add additional languages for showing in public menu"
          isHaveBorder
          spacing={0.5}
        />
        <Stack spacing={2}>
          {translations?.map((t: { name: string; code?: IOption }, idx: number) => (
            <Stack
              spacing={2}
              key={`translations.[${idx}].code.${t?.code?.code}`}
              sx={{
                borderBottom: 1,
                borderColor: borderColorDefault,
                paddingBottom: 2,
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <SelectControlled
                  name={`translations.[${idx}].code`}
                  label="Country code"
                  options={languages}
                />
                <DeleteIcon onClick={handleRemoveTranslation(idx)} />
              </Stack>
              <InputControlled name={`translations.[${idx}].name`} label="Translation" />
            </Stack>
          ))}
          <Button
            variant="contained"
            color="secondary"
            size="medium"
            fullWidth
            onClick={handleAddTranslation}
          >
            Add translation
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
};
