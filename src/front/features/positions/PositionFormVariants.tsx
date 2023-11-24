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

export const PositionFormVariants: FC = () => {
  const { watch, setValue } = useFormContext();
  const { t } = useTranslation();
  const [expanded, setExpanded] = React.useState<boolean>(true);

  const v = watch("v");
  const vt = watch("vt");

  const handleAddVariant = () => {
    setValue("v", [...v, { p: "", n: "", id: shortid.generate() }]);
    setValue("vt", [...vt, []]);
  };

  const handleAddTranslation = (variant_index: number) => () => {
    setValue(
      "vt",
      vt.map((item: any, index: number) =>
        index === variant_index ? [...item, { l: null, t: "", id: shortid.generate() }] : item
      )
    );
  };

  const handleRemoveVariant = (variant_index: number) => () => {
    setValue(
      "v",
      v.filter((_: unknown, index: number) => index !== variant_index)
    );
    setValue(
      "vt",
      vt.filter((_: unknown, index: number) => index !== variant_index)
    );
  };

  const handleRemoveTranslation = (variant_index: number, variant_translation_index: number) => () => {
    setValue(
      "vt",
      vt.map((item: any, index: number) =>
        index === variant_index
          ? item.filter((_: unknown, index: number) => index !== variant_translation_index)
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
          title={t("positions.form.variants.title")}
          subtitle={t("positions.form.variants.subtitle")}
          spacing={1}
          endIcon={<ExpandMoreIcon sx={{ transform: !expanded ? "rotate(0deg)" : "rotate(180deg)" }} />}
        />
      </Box>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {v?.map((variant: { n?: string; p?: number; id?: string }, variant_index: number) => (
          <ListItem disablePadding key={variant.id}>
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
                  <InputControlled
                    name={`v.[${variant_index}].n`}
                    label={t("positions.form.variants.name")}
                  />
                  <DeleteIcon onClick={handleRemoveVariant(variant_index)} />
                </Stack>
                <InputControlled name={`v.[${variant_index}].p`} label={t("positions.form.variants.price")} />
              </Stack>
              {vt?.[variant_index]?.map(
                (translation: { n: string; l?: IOption; id?: string }, variant_translation_index: number) => {
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
                          name={`vt.[${variant_index}].[${variant_translation_index}].l`}
                          label={t("positions.form.variants.countryCode")}
                          options={languages}
                          onlyValue
                        />
                        <DeleteIcon
                          onClick={handleRemoveTranslation(variant_index, variant_translation_index)}
                        />
                      </Stack>
                      <InputControlled
                        name={`vt.[${variant_index}].[${variant_translation_index}].t`}
                        label={t("positions.form.variants.translation")}
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
                onClick={handleAddTranslation(variant_index)}
              >
                {t("positions.form.variants.addTranslation")}
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
            onClick={handleAddVariant}
            sx={{ maxWidth: 500, marginX: "auto" }}
          >
            {t("positions.form.variants.addVariant")}
          </Button>
        </Box>
      </Collapse>
    </Fragment>
  );
};
