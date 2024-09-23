import styled from '@emotion/styled';
import { useFormikContext } from 'formik';

export const InputField = styled.input<{ isHaveError: boolean }>`
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

const InputLabel = styled.label`
  padding: 0 20px;
  color: gray;
  font-size: 14px;
  width: 100%;
  color: ${(p) => p.theme.text2};
`;

const InputError = styled.span`
  padding: 0 20px;
  color: gray;
  font-size: 14px;
  width: 100%;
  color: ${(p) => p.theme.error};
`;

export const InputContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  flex-direction: column;
  gap: 5px;

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
  disabled?: boolean;
};

export const Input = (props: Props) => {
  const { name, label, type, disabled } = props;
  const { handleChange, handleBlur, errors, getFieldProps } =
    useFormikContext<never>();

  return (
    <InputContainer>
      {errors?.[name] ? (
        <InputError>{errors[name] as string}</InputError>
      ) : (
        <InputLabel>{label}:</InputLabel>
      )}
      <InputField
        name={name}
        type={type}
        isHaveError={!!errors?.[name]}
        value={getFieldProps(name).value}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={disabled}
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
