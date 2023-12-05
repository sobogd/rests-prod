import { FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { FC } from "react";
import { Control, Controller } from "react-hook-form";

type ISelectRestsProps = {
  name: string;
  label: string;
  options: { label: string; value: string | number }[];
  control: Control<any, any>;
  error?: string;
};

export const SelectRests: FC<ISelectRestsProps> = ({ name, control, error, options, label }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl fullWidth>
          {!!label && <InputLabel>{label}</InputLabel>}
          <Select fullWidth error={!!error} variant="outlined" {...field} label={label}>
            {options.map(({ label, value }) => (
              <MenuItem value={value} key={value}>
                {label}
              </MenuItem>
            ))}
          </Select>
          {!!error && <FormHelperText error={!!error}>{error}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};
