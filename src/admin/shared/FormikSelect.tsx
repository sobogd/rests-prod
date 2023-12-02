import React from "react";
import styled from "@emotion/styled";
import { useFormikContext } from "formik";
import { borderColorDefault, errorColor, primaryColor } from "../app/styles";

const Container = styled.div<{ mb?: boolean }>`
  ${({ mb }) => (mb ? `margin-bottom: 15px;` : null)}
  position: relative;
  label {
    position: absolute;
    height: 30px;
    top: -15px;
    left: 11px;
    line-height: 30px;
    font-size: 13px;
    white-space: nowrap;
    z-index: 2;
    padding: 0 6px;
    color: #999999;
    ::before {
      content: "";
      background: #fbfbfb;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: calc(50% + 1px);
      z-index: -1;
    }
    ::after {
      content: "";
      position: absolute;
      background: white;
      width: 100%;
      bottom: 0;
      height: 15px;
      left: 0;
      z-index: -1;
    }
  }
`;

const Select = styled.select<{ mb?: boolean }>`
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  padding: 0 15px;
  height: 60px;
  border: 1px solid ${borderColorDefault};
  font-size: 16px;
  border-radius: 10px;
  width: 100%;
  background: white;
  outline-color: ${primaryColor};
  font-weight: 400;
`;

const Error = styled.div<{ mb?: boolean }>`
  ${({ mb }) => (!mb ? `margin-bottom: 5px;` : null)}
  color: ${errorColor};
`;

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
    <Container mb={mb}>
      <label>{label}</label>
      <Select
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
      </Select>
      {!!errors?.[name] ? <Error mb={mb}>{errors[name] as string}</Error> : null}
    </Container>
  );
};

export default FormikSelect;
