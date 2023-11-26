import React, { FC, Fragment } from "react";
import { useFormContext } from "react-hook-form";
import { Box, Button, Collapse, ListItem, Stack } from "@mui/material";
import { Header } from "../../shared/Header";
import { SelectControlled } from "../../shared/SelectControlled";
import { borderColorDefault } from "../../app/styles";
import { InputControlled } from "../../shared/InputControlled";
import { languages } from "../../utils/timezones";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import shortid from "shortid";

export const PositionFormTranslation: FC = () => {
  const { watch, setValue } = useFormContext();
  const i18n = useTranslation();
  const [expanded, setExpanded] = React.useState<boolean>(true);

  const t = watch("t");

  const handleAddTranslation = () => {
    setValue("t", [...t, { l: "", t: "", id: shortid.generate() }]);
  };

  const handleRemoveTranslation = (idx: number) => () => {
    setValue(
      "t",
      t.filter((_: unknown, index: number) => index !== idx)
    );
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <Fragment>
      <Box maxWidth={500} margin="auto" paddingTop={2} paddingBottom={2} paddingX={2}>
        <Header
          onClick={toggleExpanded}
          title={i18n.t("positions.form.translations.title")}
          subtitle={i18n.t("positions.form.translations.subtitle")}
          spacing={1}
          endIcon={<ExpandMoreIcon sx={{ transform: !expanded ? "rotate(0deg)" : "rotate(180deg)" }} />}
        />
      </Box>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {t?.map((translation: { l?: string; p?: number; id?: string }, idx: number) => (
          <ListItem disablePadding key={translation.id}>
            <Stack spacing={2} width="100%">
              <Stack spacing={2}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <SelectControlled
                    name={`t.[${idx}].l`}
                    label={i18n.t("positions.form.translations.countryCode")}
                    options={languages}
                    onlyValue
                  />
                  <DeleteIcon onClick={handleRemoveTranslation(idx)} />
                </Stack>
                <InputControlled
                  name={`t.[${idx}].t`}
                  label={i18n.t("positions.form.translations.translation")}
                />
              </Stack>
            </Stack>
          </ListItem>
        ))}
        <Box maxWidth={500} margin="auto" marginTop={0} marginBottom={3}>
          <Button
            variant="contained"
            color="primary"
            size="medium"
            fullWidth
            onClick={handleAddTranslation}
            sx={{ maxWidth: 500, marginX: "auto" }}
          >
            {i18n.t("positions.form.translations.addTranslation")}
          </Button>
        </Box>
      </Collapse>
    </Fragment>
  );
};
