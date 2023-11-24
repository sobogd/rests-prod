import React, { FC, ReactNode } from "react";
import { Checkbox, FormControlLabel, Switch } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export const CheckBoxControlled: FC<{
  name: string;
  label: ReactNode | string;
}> = ({ name, label }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          sx={{ ".MuiSwitch-root": { marginY: -2 } }}
          control={<Switch {...field} checked={field.value} />}
          label={label}
        />
      )}
    />
  );
};
