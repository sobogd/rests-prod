import React from "react";
import styled from "@emotion/styled";
import { useFormikContext } from "formik";
import { backgroundDefault, borderColorDefault, errorColor, primaryColor } from "../app/styles";

const Container = styled.div<{ mb?: boolean }>`
  ${({ mb }) => (mb ? `margin-bottom: 15px;` : null)}
  position: relative;
  display: flex;
  flex-direction: column !important;
  position: relative !important;
  label {
    position: absolute;
    height: 30px;
    top: -15px;
    left: 11px;
    line-height: 30px;
    font-size: 12px;
    white-space: nowrap;
    z-index: 2;
    padding: 0 6px;
    color: #999999;
    ::before {
      content: "";
      background: ${backgroundDefault};
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
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:focus {
    transition: background-color 0s 6000000000s, color 0s 600000000000s;
  }
  textarea:-internal-autofill-selected {
    background-color: white !important;
  }
`;

const Textarea = styled.textarea<{ mb?: boolean }>`
  padding: 17px 15px;
  min-height: 80px;
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
  padding: 5px 15px 0;
  font-size: 13px;
`;

const FormikTextarea: React.FC<{
  name: string;
  label: string;
  mb?: boolean;
}> = ({ name, label, mb }) => {
  const { getFieldProps, handleChange, handleBlur, errors } = useFormikContext<any>();
  return (
    <Container mb={mb}>
      <label>{label}</label>
      <Textarea name={name} value={getFieldProps(name).value} onChange={handleChange} onBlur={handleBlur} />
      {!!errors?.[name] ? <Error mb={mb}>{errors[name] as string}</Error> : null}
    </Container>
  );
};

export default FormikTextarea;
