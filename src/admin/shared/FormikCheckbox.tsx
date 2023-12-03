import React from "react";
import styled from "@emotion/styled";
import { useFormikContext } from "formik";
import { borderColorDefault, errorColor, primaryColor } from "../app/styles";
import { TbCheck } from "react-icons/tb";

const Container = styled.div<{ mb?: boolean }>`
  ${({ mb }) => (mb ? `margin-bottom: 15px;` : null)}
`;

const CheckboxLabel = styled.label<{ checked?: boolean }>`
  min-height: 40px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  svg {
    background: white;
    border: 1px solid ${borderColorDefault};
    width: 30px;
    height: 30px;
    border-radius: 8px;
    margin-right: 15px;
    padding: 4px;
    color: ${({ checked }) => (checked ? primaryColor : "white")};
  }
`;

const Error = styled.div<{ mb?: boolean }>`
  ${({ mb }) => (!mb ? `margin-bottom: 5px;` : null)}
  color: ${errorColor};
  font-size: 13px;
`;

const FormikCheckbox: React.FC<{
  name: string;
  label: string;
  mb?: boolean;
}> = ({ name, label, mb }) => {
  const { getFieldProps, errors, setFieldValue } = useFormikContext<any>();
  return (
    <Container mb={mb}>
      <CheckboxLabel
        htmlFor={name}
        onClick={() => setFieldValue(name, !getFieldProps(name).value)}
        checked={!!getFieldProps(name).value}
      >
        <input name={name} type="hidden" value={getFieldProps(name).value} />
        <TbCheck />
        {label}
      </CheckboxLabel>
      {!!errors?.[name] ? <Error mb={mb}>{errors[name] as string}</Error> : null}
    </Container>
  );
};

export default FormikCheckbox;
