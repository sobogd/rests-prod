import { FC } from "react";
import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export const InputControlled: FC<{
  name: string;
  label: string;
  type?: string;
  rows?: number;
}> = ({ name, label, type = "text", rows }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          label={label}
          type={type}
          error={!!errors[name]?.message}
          helperText={errors[name]?.message?.toString()}
          variant="outlined"
          fullWidth
          rows={rows}
          multiline={rows != null}
          {...field}
          inputProps={{
            autoComplete: "new-password",
          }}
        />
      )}
    />
  );
};
