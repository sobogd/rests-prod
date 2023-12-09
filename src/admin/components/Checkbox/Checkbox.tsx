import React from "react";
import { TbCheck } from "react-icons/tb";
import { CheckboxStyled } from "./styles";

const Checkbox: React.FC<{
  value: boolean;
  onChange: (newValue: boolean) => void;
  label: any;
  mb?: boolean;
}> = ({ value, onChange, label, mb }) => {
  return (
    <CheckboxStyled.Container mb={mb}>
      <CheckboxStyled.CheckboxLabel htmlFor={label} onClick={() => onChange(!value)} checked={!!value}>
        <input name={label} type="hidden" value={value as any} />
        <TbCheck />
        {label}
      </CheckboxStyled.CheckboxLabel>
    </CheckboxStyled.Container>
  );
};

export default Checkbox;
