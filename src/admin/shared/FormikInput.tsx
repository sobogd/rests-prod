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
  input:-webkit-autofill,
  input:-webkit-autofill:focus {
    transition: background-color 0s 6000000000s, color 0s 600000000000s;
  }
  input:-internal-autofill-selected {
    background-color: white !important;
  }
`;

const Input = styled.input<{ mb?: boolean }>`
  padding: 0 15px;
  height: 60px;
  border: 1px solid ${borderColorDefault};
  font-size: 16px;
  border-radius: 10px;
  width: 100%;
  background: white;
  outline-color: ${primaryColor};
`;

const Error = styled.div<{ mb?: boolean }>`
  ${({ mb }) => (!mb ? `margin-bottom: 5px;` : null)}
  color: ${errorColor};
`;

const FormikInput: React.FC<{
  name: string;
  label: string;
  type?: string;
  mb?: boolean;
}> = ({ name, label, mb, type }) => {
  const { handleChange, handleBlur, errors, getFieldProps } = useFormikContext<any>();

  return (
    <Container mb={mb}>
      <label>{label}</label>
      <Input
        name={name}
        type={type ?? "text"}
        value={getFieldProps(name).value}
        onChange={handleChange}
        onBlur={handleBlur}
        onWheel={(e) => {
          // @ts-expect-error
          document.activeElement.blur();
        }}
      />
      {!!errors?.[name] ? <Error mb={mb}>{errors[name] as string}</Error> : null}
    </Container>
  );
};

export default FormikInput;
