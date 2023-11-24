import React, { FC, Fragment } from "react";
import { useFormContext } from "react-hook-form";
import { Box, Button, Collapse, ListItem, Stack, styled } from "@mui/material";
import { Header } from "../../shared/Header";
import { SelectControlled } from "../../shared/SelectControlled";
import { borderColorDefault } from "../../app/styles";
import { InputControlled } from "../../shared/InputControlled";
import { languages } from "../../utils/timezones";
import DeleteIcon from "@mui/icons-material/Delete";
import { IOption } from "../../app/interfaces";
import { useTranslation } from "react-i18next";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import shortid from "shortid";

export const PositionFormOptions: FC = () => {
  const { watch, setValue } = useFormContext();
  const { t } = useTranslation();
  const [expanded, setExpanded] = React.useState<boolean>(true);

  const o = watch("o");
  const ot = watch("ot");

  const handleAddOption = () => {
    setValue("o", [...o, { p: "", n: "", id: shortid.generate() }]);
    setValue("ot", [...ot, []]);
  };

  const handleAddTranslation = (option_index: number) => () => {
    setValue(
      "ot",
      ot.map((item: any, index: number) =>
        index === option_index ? [...item, { l: null, t: "", id: shortid.generate() }] : item
      )
    );
  };

  const handleRemoveOption = (option_index: number) => () => {
    setValue(
      "o",
      o.filter((_: unknown, index: number) => index !== option_index)
    );
    setValue(
      "ot",
      ot.filter((_: unknown, index: number) => index !== option_index)
    );
  };

  const handleRemoveTranslation = (option_index: number, option_translation_index: number) => () => {
    setValue(
      "ot",
      ot.map((item: any, index: number) =>
        index === option_index
          ? item.filter((_: unknown, index: number) => index !== option_translation_index)
          : item
      )
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
          title={t("positions.form.options.title")}
          subtitle={t("positions.form.options.subtitle")}
          spacing={1}
          endIcon={<ExpandMoreIcon sx={{ transform: !expanded ? "rotate(0deg)" : "rotate(180deg)" }} />}
        />
      </Box>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {o?.map((option: { n?: string; p?: number; id?: string }, option_index: number) => (
          <ListItem disablePadding key={option.id}>
            <Stack spacing={2} width="100%">
              <Stack
                spacing={2}
                sx={{
                  borderBottom: 1,
                  borderColor: borderColorDefault,
                  paddingBottom: 2,
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <InputControlled name={`o.[${option_index}].n`} label={t("positions.form.options.name")} />
                  <DeleteIcon onClick={handleRemoveOption(option_index)} />
                </Stack>
                <InputControlled name={`o.[${option_index}].p`} label={t("positions.form.options.price")} />
              </Stack>
              {ot?.[option_index]?.map(
                (translation: { n: string; l?: IOption; id?: string }, option_translation_index: number) => {
                  return (
                    <Stack
                      spacing={2}
                      key={translation.id}
                      sx={{
                        borderBottom: 1,
                        borderColor: borderColorDefault,
                        paddingBottom: 2,
                      }}
                    >
                      <Stack direction="row" spacing={2} alignItems="center">
                        <SelectControlled
                          name={`ot.[${option_index}].[${option_translation_index}].l`}
                          label={t("positions.form.options.countryCode")}
                          options={languages}
                          onlyValue
                        />
                        <DeleteIcon
                          onClick={handleRemoveTranslation(option_index, option_translation_index)}
                        />
                      </Stack>
                      <InputControlled
                        name={`ot.[${option_index}].[${option_translation_index}].t`}
                        label={t("positions.form.options.translation")}
                      />
                    </Stack>
                  );
                }
              )}
              <Button
                variant="contained"
                color="secondary"
                size="medium"
                fullWidth
                onClick={handleAddTranslation(option_index)}
              >
                {t("positions.form.options.addTranslation")}
              </Button>
            </Stack>
          </ListItem>
        ))}
        <Box maxWidth={500} margin="auto" marginTop={0} marginBottom={3}>
          <Button
            variant="contained"
            color="primary"
            size="medium"
            fullWidth
            onClick={handleAddOption}
            sx={{ maxWidth: 500, marginX: "auto" }}
          >
            {t("positions.form.options.addOption")}
          </Button>
        </Box>
      </Collapse>
    </Fragment>
  );
};
