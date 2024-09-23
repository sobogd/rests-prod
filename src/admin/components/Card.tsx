import styled from '@emotion/styled';
import { PropsWithChildren } from 'react';
import { Button, ButtonProps } from './Button';
import { Header, HeaderProps } from './Header';

const Wrapper = styled.div<{ noWrap?: boolean }>`
  background: ${(props) => props.theme.background2};
  padding: 20px 30px 20px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
  flex: ${(p) => (p.noWrap ? '1 1 100%' : '1 1 auto')};
  max-width: 100%;

  @media (max-width: 750px) {
    flex: 1;
    width: 100%;
  }
`;

const Conteiner = styled.div`
  margin: 15px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

export type CardProps = PropsWithChildren & {
  button?: ButtonProps;
  header?: HeaderProps;
  noWrap?: boolean;
  onClick?: () => void;
};

export const Card = (props: CardProps) => {
  const { header, button, children, noWrap, onClick } = props;

  return (
    <Wrapper noWrap={noWrap} onClick={onClick}>
      {!!header && <Header {...header} size="small" />}
      {!!children && <Conteiner>{children}</Conteiner>}
      {!!button && <Button {...button} />}
    </Wrapper>
  );
};
