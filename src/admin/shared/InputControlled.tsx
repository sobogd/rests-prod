import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";

export const InputControlled: FC<{
  name: string;
  label: string;
  type?: string;
  rows?: number;
  marginBottom?: number;
}> = ({ name, label, type = "text", rows, marginBottom = 0 }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div style={{ marginBottom }}>
          <input placeholder={label} type={type} {...field} />
          {!!errors[name]?.message ? errors[name]?.message?.toString() : null}
        </div>
      )}
    />
  );
};
