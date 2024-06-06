import styled from '@emotion/styled';
import { useFormikContext } from 'formik';
import React from 'react';

export const InputField = styled.input<{ isHaveError: boolean }>`
  display: flex;
  width: 100%;
  height: 50px;
  border: 1px solid ${(p) => (p.isHaveError ? p.theme.error : p.theme.divider)};
  color: ${(p) => p.theme.text1};
  outline: none;
  background: ${(p) => p.theme.textBackground};
  border-radius: 25px;
  padding: 0 30px;
`;

export const InputError = styled.span`
  display: flex;
  color: ${(p) => p.theme.error};
  position: absolute;
  line-height: 14px;
  height: 14px;
  max-height: 14px;
  min-height: 14px;
  max-width: calc(100% - 50px);
  overflow: hidden;
  text-overflow: ellipsis;
  left: 25px;
  padding: 0 5px;
  font-size: 14px;
  top: -7px;
  background: ${(p) => p.theme.background1};
  z-index: 1;

  ::after {
    content: '';
    width: 100%;
    height: 7px;
    position: absolute;
    background: ${(p) => p.theme.textBackground};
    z-index: -1;
    bottom: 0;
    left: 0;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;

  input:-webkit-autofill,
  input:-webkit-autofill:focus {
    transition: background-color 0s 6000000000s, color 0s 600000000000s;
  }
  input:-internal-autofill-selected {
    background-color: white !important;
  }
`;

type Props = {
  name: string;
  label: string;
  type: string;
};

export const Input = (props: Props) => {
  const { name, label, type } = props;
  const { handleChange, handleBlur, errors, getFieldProps } =
    useFormikContext<never>();

  return (
    <InputContainer>
      {errors?.[name] ? (
        <InputError>{errors[name] as string}</InputError>
      ) : null}
      <InputField
        name={name}
        type={type}
        isHaveError={!!errors?.[name]}
        placeholder={label}
        value={getFieldProps(name).value}
        onChange={handleChange}
        onBlur={handleBlur}
        autoComplete="off"
        onWheel={() => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          document.activeElement.blur();
        }}
      />
    </InputContainer>
  );
};
