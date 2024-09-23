import styled from '@emotion/styled';
import { useFormikContext } from 'formik';

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
  color: ${(p) => (p.disabled ? p.theme.text3 : p.theme.text1)};
  outline: none;
  background: ${(p) => p.theme.textBackground};
  border-radius: 25px;
  padding: 0 20px;
`;

const SelectLabel = styled.label`
  padding: 0 20px;
  color: gray;
  font-size: 14px;
  width: 100%;
  color: ${(p) => p.theme.text2};
`;

const SelectError = styled.span`
  padding: 0 20px;
  color: gray;
  font-size: 14px;
  width: 100%;
  color: ${(p) => p.theme.error};
`;

export const SelectContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  flex-direction: column;
  gap: 5px;

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
  disabled?: boolean;
  options: { value: string | number; label: string }[];
};

export const Select = (props: Props) => {
  const { name, label, options, disabled } = props;
  const { handleChange, handleBlur, errors, getFieldProps } =
    useFormikContext<never>();

  return (
    <SelectContainer>
      {errors?.[name] ? (
        <SelectError>{errors[name] as string}</SelectError>
      ) : (
        <SelectLabel>{label}:</SelectLabel>
      )}
      <SelectField
        name={name}
        isHaveError={!!errors?.[name]}
        value={getFieldProps(name).value ?? undefined}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={label}
        disabled={disabled}
      >
        <option value={undefined} disabled selected></option>
        {options.map((option, index) => (
          <option key={option.value + '-' + index} value={option.value}>
            {option.label}
          </option>
        ))}
      </SelectField>
    </SelectContainer>
  );
};
