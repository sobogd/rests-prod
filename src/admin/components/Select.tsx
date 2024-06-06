import styled from '@emotion/styled';
import { useFormikContext } from 'formik';
import React from 'react';

import { newBorderColor, textDefaultColor } from '../styles';

const SelectField = styled.select<{ isHaveError: boolean }>`
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  border: 1px solid ${newBorderColor};
  font-size: 16px;
  background: white;
  outline-color: ${textDefaultColor};
  font-weight: 400;

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

export const SelectError = styled.span`
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

export const SelectContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;

  select:-webkit-autofill,
  select:-webkit-autofill:focus {
    transition: background-color 0s 6000000000s, color 0s 600000000000s;
  }
  select:-internal-autofill-selected {
    background-color: white !important;
  }
`;

type Props = {
  name: string;
  label: string;
  options: { value: string | number; label: string }[];
};

export const Select = (props: Props) => {
  const { name, label, options } = props;
  const { handleChange, handleBlur, errors, getFieldProps } =
    useFormikContext<never>();

  return (
    <SelectContainer>
      {errors?.[name] ? (
        <SelectError>{errors[name] as string}</SelectError>
      ) : null}
      <SelectField
        name={name}
        isHaveError={!!errors?.[name]}
        value={getFieldProps(name).value ?? undefined}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={label}
      >
        <option value={undefined} disabled selected>
          {label}
        </option>
        {options.map((option, index) => (
          <option key={option.value + '-' + index} value={option.value}>
            {option.label}
          </option>
        ))}
      </SelectField>
    </SelectContainer>
  );
};
