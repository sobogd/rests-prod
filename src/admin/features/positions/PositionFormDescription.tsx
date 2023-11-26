import { FC, Fragment, useState } from "react";
import { Box, Collapse, ListItem, Stack } from "@mui/material";
import { InputControlled } from "../../shared/InputControlled";
import { useTranslation } from "react-i18next";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Header } from "../../shared/Header";

export const PositionFormDescription: FC = () => {
  const i18n = useTranslation();
  const [expanded, setExpanded] = useState<boolean>(true);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <Fragment>
      <Box maxWidth={500} margin="auto" paddingTop={2} paddingBottom={2} paddingX={2}>
        <Header
          onClick={toggleExpanded}
          title={i18n.t("positions.form.description.title")}
          subtitle={i18n.t("positions.form.description.subtitle")}
          spacing={1}
          endIcon={<ExpandMoreIcon sx={{ transform: !expanded ? "rotate(0deg)" : "rotate(180deg)" }} />}
        />
      </Box>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <ListItem disablePadding>
          <Stack spacing={2} width="100%">
            <InputControlled rows={5} name="d" label={i18n.t("positions.form.description.d")} />
          </Stack>
        </ListItem>
      </Collapse>
    </Fragment>
  );
};
