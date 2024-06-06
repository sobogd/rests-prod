import styled from '@emotion/styled';
import { ButtonHTMLAttributes, memo, ReactNode } from 'react';

import { Loading } from './Loading';

const ButtonStyled = styled.button<{
  color?: 'primary' | 'disabled' | 'secondary';
  size?: 'default' | 'small';
}>`
  background: ${(p) => {
    if (p.color === 'disabled') return p.theme.disabledGradient;
    if (p.color === 'secondary') return p.theme.secondaryGradient;

    return p.theme.primaryGradient;
  }};
  color: ${(p) => {
    if (p.color === 'disabled') return p.theme.text1;
    if (p.color === 'secondary') return p.theme.white1;

    return p.theme.white1;
  }};
  font-weight: 600;
  text-align: center;
  height: ${(p) => (p.size === 'small' ? '40px' : '50px')};
  min-height: ${(p) => (p.size === 'small' ? '40px' : '50px')};
  max-height: ${(p) => (p.size === 'small' ? '40px' : '50px')};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${(p) => (p.size === 'small' ? '14px' : '16px')};
  border-radius: 100px;
  opacity: ${(p) => (p.disabled ? '0.4' : '1')};
  cursor: ${(p) => (p.disabled ? 'not-allowed' : 'pointer')};
  transition: 0.2s;
  outline: none !important;
  width: 100%;
  line-height: 14px;
  padding: 0 30px;

  svg {
    font-size: ${(p) => (p.size === 'small' ? '20px' : '22px')};
  }

  :hover {
    opacity: ${(p) => (p.disabled ? '0.4' : '0.8')};
  }
`;

type Props = {
  label: string | ReactNode;
  isSubmit?: boolean;
  isLoading?: boolean;
  color?: 'primary' | 'disabled' | 'secondary';
  size?: 'default' | 'small';
};

export const Button = memo(
  (props: ButtonHTMLAttributes<HTMLButtonElement> & Props) => {
    const { label, isSubmit, onClick, isLoading, size, disabled } = props;

    return (
      <ButtonStyled
        {...props}
        type={isSubmit ? 'submit' : 'button'}
        onClick={!isSubmit ? onClick : undefined}
        disabled={disabled ?? isLoading}
        size={size}
      >
        {isLoading ? <Loading isLoading={true} /> : label}
      </ButtonStyled>
    );
  },
);
