import React from "react";
import { useFormikContext } from "formik";
import { TbCheck } from "react-icons/tb";
import { CheckboxStyled } from "./styles";

const FormikCheckbox: React.FC<{
  name: string;
  label: string;
  mb?: boolean;
}> = ({ name, label, mb }) => {
  const { getFieldProps, errors, setFieldValue } = useFormikContext<any>();
  return (
    <CheckboxStyled.Container mb={mb}>
      <CheckboxStyled.CheckboxLabel
        htmlFor={name}
        onClick={() => setFieldValue(name, !getFieldProps(name).value)}
        checked={!!getFieldProps(name).value}
      >
        <input name={name} type="hidden" value={getFieldProps(name).value} />
        <TbCheck />
        {label}
      </CheckboxStyled.CheckboxLabel>
      {!!errors?.[name] ? (
        <CheckboxStyled.Error mb={mb}>{errors[name] as string}</CheckboxStyled.Error>
      ) : null}
    </CheckboxStyled.Container>
  );
};

export default FormikCheckbox;
