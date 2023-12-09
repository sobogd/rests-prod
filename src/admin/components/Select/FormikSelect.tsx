import React from "react";
import { useFormikContext } from "formik";
import { SelectStyled } from "./styles";

const FormikSelect: React.FC<{
  name: string;
  label: string;
  type?: string;
  mb?: boolean;
  options: { value: string | number; label: string }[];
  firstDefault?: boolean;
}> = ({ name, label, mb, type, options, firstDefault }) => {
  const { getFieldProps, handleChange, handleBlur, errors } = useFormikContext<any>();
  return (
    <SelectStyled.Container mb={mb}>
      <label>{label}</label>
      <SelectStyled.Select
        name={name}
        value={getFieldProps(name).value ?? undefined}
        onChange={handleChange}
        onBlur={handleBlur}
      >
        {!firstDefault ? <option value={undefined} disabled selected></option> : null}
        {options.map((option, index) => (
          <option value={option.value} selected={!!firstDefault && index === 0 ? true : undefined}>
            {option.label}
          </option>
        ))}
      </SelectStyled.Select>
      {!!errors?.[name] ? <SelectStyled.Error mb={mb}>{errors[name] as string}</SelectStyled.Error> : null}
    </SelectStyled.Container>
  );
};

export default FormikSelect;
