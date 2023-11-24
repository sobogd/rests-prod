import React, { FC, ReactNode } from "react";
import { Stack, Switch, Typography } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export const SwitchControlled: FC<{
  name: string;
  label: ReactNode | string;
}> = ({ name, label }) => {
  const { control } = useFormContext();
  return (
    <Stack direction="row" spacing={1} margin={0} alignItems="center">
      <Controller
        name={name}
        control={control}
        render={({ field }) => <Switch {...field} checked={!!field.value} />}
      />
      <Typography>{label}</Typography>
    </Stack>
  );
};
