import React, { FC, Fragment } from "react";
import { ListItem, Stack } from "@mui/material";
import { Header } from "../../shared/Header";
import { InputControlled } from "../../shared/InputControlled";

export const CategoriesFormGeneral: FC = () => {
  return (
    <Fragment>
      <ListItem disablePadding>
        <Stack spacing={2} width="100%">
          <Header
            title="General"
            subtitle="Information about category"
            isHaveBorder
            spacing={0.5}
          />
          <InputControlled name="name" label="Name" />
          <InputControlled name="description" label="Description" />
        </Stack>
      </ListItem>
    </Fragment>
  );
};
