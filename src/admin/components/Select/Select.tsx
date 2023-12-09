import React from "react";
import { SelectStyled } from "./styles";

const Select: React.FC<{
  label: string;
  value?: string | number;
  mb?: boolean;
  options: { value: string | number; label: string }[];
  firstDefault?: boolean;
}> = ({ label, mb, value, options, firstDefault }) => {
  return (
    <SelectStyled.Container mb={mb}>
      <label>{label}</label>
      <SelectStyled.Select
        value={value}
        onChange={(e) => {
          console.log(e.target.value);
        }}
      >
        {!firstDefault ? <option value={undefined} disabled selected></option> : null}
        {options.map((option, index) => (
          <option value={option.value} selected={!!firstDefault && index === 0 ? true : undefined}>
            {option.label}
          </option>
        ))}
      </SelectStyled.Select>
    </SelectStyled.Container>
  );
};

export default Select;
