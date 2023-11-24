import React, { FC } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export const SelectControlled: FC<{
  name: string;
  label: string;
  options: {
    code: string | number;
    name: string | number;
  }[];
  multiple?: boolean;
  onlyValue?: boolean;
}> = ({ name, label, options, multiple, onlyValue = false }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Autocomplete
          {...field}
          fullWidth
          openOnFocus
          multiple={multiple}
          // @ts-ignore
          options={options ?? []}
          value={onlyValue ? options.find((v) => v.code === field.value) ?? null : field.value ?? null}
          onChange={(_, option) => {
            // @ts-ignore
            field.onChange(onlyValue ? option?.code : option);
          }}
          // @ts-ignore
          getOptionLabel={(option) => options?.find((o) => o.code === option.code)?.name || ""}
          isOptionEqualToValue={(option, value) => option.code === value.code}
          renderInput={(params) => (
            // @ts-ignore
            <TextField
              {...params}
              fullWidth
              variant="outlined"
              label={label}
              placeholder={label}
              helperText={errors[name]?.message?.toString()}
              error={!!errors[name]?.message}
            />
          )}
        />
      )}
    />
  );
};
