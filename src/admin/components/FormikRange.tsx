import React from "react";
import styled from "@emotion/styled";
import { useFormikContext } from "formik";
import { newBorderColor, textDefaultColor, errorColor } from "../styles";

const Container = styled.div<{ mb?: boolean }>`
  ${({ mb }) => (mb ? `margin-bottom: 15px;` : null)}
  display: flex;
  flex-direction: column !important;
  position: relative !important;
  width: 100%;
`;

const RangeLabel = styled.label<{ checked?: boolean }>`
  font-size: 16px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column-reverse;
  width: 100%;
  align-items: flex-start;
  input {
    width: 100%;
  }
  svg {
    background: white;
    border: 1px solid ${newBorderColor};
    width: 30px;
    height: 30px;
    min-width: 30px;
    min-height: 30px;
    border-radius: 8px;
    margin-right: 15px;
    padding: 4px;
    color: ${({ checked }) => (checked ? textDefaultColor : "white")};
  }
`;

const Error = styled.div<{ mb?: boolean }>`
  ${({ mb }) => (!mb ? `margin-bottom: 5px;` : null)}
  color: ${errorColor};
  font-size: 13px;
`;

const FormikRange: React.FC<{
  min: number;
  max: number;
  step: number;
  name: string;
  label: string;
  mb?: boolean;
}> = ({ name, label, mb, min, max, step }) => {
  const { getFieldProps, errors, handleChange } = useFormikContext<any>();
  return (
    <Container mb={mb}>
      <RangeLabel htmlFor={name}>
        <input
          type="range"
          id={name}
          name={name}
          min={min}
          max={max}
          value={getFieldProps(name).value}
          onChange={handleChange}
          step={step}
        />
        {label}
      </RangeLabel>
      {!!errors?.[name] ? <Error mb={mb}>{errors[name] as string}</Error> : null}
    </Container>
  );
};

export default FormikRange;
