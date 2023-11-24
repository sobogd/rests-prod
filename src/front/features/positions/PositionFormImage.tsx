import React, { ChangeEvent, FC, Fragment, useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Box, Button, Collapse, ListItem, Stack } from "@mui/material";
import { Header } from "../../shared/Header";
import { Notice } from "../../hooks/useNotification";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTranslation } from "react-i18next";

export const PositionFormImage: FC = () => {
  const { control, watch, setValue } = useFormContext();
  const i18n = useTranslation();
  const [expanded, setExpanded] = React.useState<boolean>(true);

  const fileUrl = watch("fUrl");

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      const tempImg = new Image();
      tempImg.onload = function () {
        // @ts-ignore
        if (this.width < this.height) {
          Notice.warning("Width must be greater than height");
        } else if (e.target.files?.[0]) {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(e.target.files?.[0]);
          fileReader.onload = function (evt) {
            const base64 = evt.target?.result;
            setValue("f", base64);
            setValue("fUrl", url);
            setValue("fChanged", true);
            return base64;
          };
        }
      };
      tempImg.src = url;
    }
  };

  const handleRemovePhoto = () => {
    setValue("f", undefined);
    setValue("fUrl", undefined);
    setValue("fChanged", true);
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <Fragment>
      <Box maxWidth={500} margin="auto" paddingTop={2} paddingBottom={2} paddingX={2}>
        <Header
          onClick={toggleExpanded}
          title={i18n.t("positions.form.image.title")}
          subtitle={i18n.t("positions.form.image.subtitle")}
          spacing={1}
          endIcon={<ExpandMoreIcon sx={{ transform: !expanded ? "rotate(0deg)" : "rotate(180deg)" }} />}
        />
      </Box>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {fileUrl != null && (
          <ListItem disablePadding>
            <Box component="img" src={fileUrl} width="100%" borderRadius={2} />
          </ListItem>
        )}
        <Stack spacing={1} width="100%" maxWidth={500} margin="auto" marginTop={0} marginBottom={3}>
          <Button variant="contained" color="primary" size="medium" fullWidth component="label">
            <Controller
              name="fileUpload"
              control={control}
              render={({ field }) => <input {...field} type="file" hidden onChange={handleChangeFile} />}
            />
            {!!fileUrl ? i18n.t("positions.form.image.change") : i18n.t("positions.form.image.upload")}
          </Button>
          {!!fileUrl && (
            <Button variant="contained" color="error" size="medium" fullWidth onClick={handleRemovePhoto}>
              {i18n.t("positions.form.image.remove")}
            </Button>
          )}
        </Stack>
      </Collapse>
    </Fragment>
  );
};
