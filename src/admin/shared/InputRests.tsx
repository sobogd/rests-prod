import { TextField } from "@mui/material";
import { FC } from "react";
import { Control, Controller } from "react-hook-form";

type IInputRestsProps = {
  name: string;
  label: string;
  control: Control<any, any>;
  rows?: number;
  error?: string;
  type?: string;
};

export const InputRests: FC<IInputRestsProps> = ({
  name,
  label,
  control,
  rows,
  error,
  type = "text",
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          fullWidth
          multiline={!!rows}
          rows={rows || 1}
          label={label}
          error={!!error}
          helperText={error}
          type={type}
          variant="outlined"
          {...field}
        />
      )}
    />
  );
};
