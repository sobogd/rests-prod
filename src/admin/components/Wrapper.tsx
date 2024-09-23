import styled from '@emotion/styled';
import { Form } from 'formik';
import { PropsWithChildren } from 'react';
import { Button, ButtonProps } from './Button';
import { Header, HeaderProps } from './Header';
import { Loading } from './Loading';

const Fullscreen = styled.div`
  background: ${(p) => p.theme.background1};
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 30px;
  min-height: 100%;

  @media (max-width: 750px) {
    padding: 30px;
  }

  @media (min-width: 751px) {
    height: 100%;
    gap: 0;
  }
`;

export const WrapperForm = styled(Form)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  overflow-y: auto;
  overflow-x: hidden;
`;

const HeaderContainer = styled.div`
  @media (min-width: 751px) {
    background: ${(p) => p.theme.background2};
    border-bottom: 1px solid ${(p) => p.theme.divider};
    padding: 15px 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 20px;
  align-items: flex-start;

  @media (max-width: 750px) {
    flex-wrap: nowrap;
    flex-direction: column;
  }

  @media (min-width: 750px) {
    overflow-y: scroll;
    padding: 30px;
  }
`;

const ButtonsContainer = styled.div`
  @media (min-width: 750px) {
    display: flex;
    flex-direction: row-reverse;
    gap: 15px;

    > button {
      width: auto;
    }
  }

  @media (max-width: 750px) {
    display: none;
  }
`;

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  @media (min-width: 750px) {
    display: none;
  }
`;

type Props = PropsWithChildren & {
  header?: HeaderProps;
  isLoading?: boolean;
  buttons?: ButtonProps[];
};

export const Wrapper = (props: Props) => {
  const { children, isLoading, buttons, header } = props;

  return (
    <Fullscreen>
      <Loading isLoading={isLoading} isFullscreen />
      {!!header && (
        <HeaderContainer>
          <Header {...header} />
          {!!buttons && (
            <ButtonsContainer>
              {buttons.map((props) => (
                <Button {...props} />
              ))}
            </ButtonsContainer>
          )}
        </HeaderContainer>
      )}
      <Container>{children}</Container>
      {!!buttons && (
        <FooterContainer>
          {buttons.map((props) => (
            <Button {...props} />
          ))}
        </FooterContainer>
      )}
    </Fullscreen>
  );
};
