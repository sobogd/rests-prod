import styled from '@emotion/styled';
import { useFormikContext } from 'formik';

import { newBorderColor, textDefaultColor } from '../styles';

const SelectStyled = styled.select<{
  isHaveError: boolean;
  notSelected: boolean;
}>`
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
  color: ${(p) =>
    p.notSelected ? '#757575' : p.disabled ? p.theme.text3 : p.theme.text1};
  outline: none;
  background: ${(p) => p.theme.textBackground};
  border-radius: 10px;
  padding: 0 15px;
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
    <SelectStyled
      name={name}
      isHaveError={!!errors?.[name]}
      value={getFieldProps(name).value ?? undefined}
      notSelected={!getFieldProps(name).value}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled={disabled}
    >
      <option value={undefined} disabled selected>
        {errors?.[name] ?? label}
      </option>
      {options.map((option, index) => (
        <option key={option.value + '-' + index} value={option.value}>
          {option.label}
        </option>
      ))}
    </SelectStyled>
  );
};
