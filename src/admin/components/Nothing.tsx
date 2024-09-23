import styled from '@emotion/styled';
import { memo } from 'react';
import { Button, ButtonProps } from './Button';

export type NothingProps = {
  title: string;
  description: string;
  button?: ButtonProps;
};

const Title = styled.div`
  color: ${(props) => props.theme.text1};
  font-weight: 600;
  font-size: 28px;
  line-height: 28px;
`;

const SubTitle = styled.div`
  color: ${(props) => props.theme.text2};
  font-size: 16px;
`;

const Container = styled.div`
  padding: 20px 30px 30px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 100%;
  align-items: center;
  max-width: 450px;
  margin: auto;
  width: 100%;
  height: 100%;
  flex: 1;
  margin: auto;
  min-height: 350px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(p) => p.theme.text2};
  flex-direction: column;
  gap: 20px;
  text-align: center;

  @media (min-width: 650px) {
    width: auto;
    height: auto;
    max-width: 450px;
  }
`;

export const Nothing = memo((props: NothingProps) => {
  const { button, title, description } = props;
  return (
    <Container>
      <Title>{title}</Title>
      <SubTitle>{description}</SubTitle>
      {!!button && <Button {...button} size="default" />}
    </Container>
  );
});
