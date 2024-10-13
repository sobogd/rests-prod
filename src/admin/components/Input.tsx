import styled from '@emotion/styled';
import { useFormikContext } from 'formik';
import { SyntheticEvent, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

const InputStyled = styled.input<{ isHaveError: boolean }>`
  display: flex;
  width: 100%;
  height: 50px;
  border: 1px solid ${(p) => (p.isHaveError ? p.theme.error : p.theme.divider)};
  color: ${(p) => (p.disabled ? p.theme.text3 : p.theme.text1)};
  outline: none;
  background: ${(p) => p.theme.textBackground};
  border-radius: 10px;
  padding: 0 15px;

  :-webkit-autofill {
    -webkit-box-shadow: 0 0 0 100px ${(p) => p.theme.textBackground} inset;
    -webkit-text-fill-color: ${(p) =>
      p.disabled ? p.theme.text3 : p.theme.text1};
    -webkit-background-fill-color: ${(p) => p.theme.textBackground};
  }

  :-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0 100px ${(p) => p.theme.textBackground} inset;
    -webkit-text-fill-color: ${(p) =>
      p.disabled ? p.theme.text3 : p.theme.text1};
  }
`;

type Props = {
  name: string;
  label: string;
  type: string;
  disabled?: boolean;
};

export const Input = (props: Props) => {
  const { name, label, type, disabled } = props;
  const { handleBlur, errors, getFieldProps, setFieldValue } =
    useFormikContext<never>();

  const handleChange = useCallback(
    (e: SyntheticEvent<HTMLInputElement>) => {
      setFieldValue(name, (e.target as HTMLInputElement).value);
    },
    [name, setFieldValue],
  );

  return (
    <InputStyled
      name={uuidv4()}
      type={type}
      isHaveError={!!errors?.[name]}
      value={getFieldProps(name).value}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled={disabled}
      placeholder={errors?.[name] ?? label}
      autoComplete="false"
      readOnly={true}
      onFocus={(e) => e.target.removeAttribute('readonly')}
      onWheel={() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        document.activeElement.blur();
      }}
    />
  );
};
