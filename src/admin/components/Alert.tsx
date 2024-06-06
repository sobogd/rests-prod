import styled from '@emotion/styled';
import { memo } from 'react';

import { Button } from './Button';

const AlertBackground = styled.div`
  position: fixed;
  z-index: 1000;
  background: ${(p) => p.theme.transparent};
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AlertContainer = styled.div<{ type: 'error' | 'success' }>`
  background: ${(p) => p.theme.background1};
  border: 1px solid ${(p) => p.theme.divider};
  border-radius: 25px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 250px;
  max-width: 320px;
  width: 100%;
  margin: 30px;
`;

const AlertTitle = styled.div`
  font-size: 30px;
  line-height: 30px;
  font-weight: 600;
  color: ${(p) => p.theme.text1};
`;

const AlertText = styled.div`
  margin-bottom: 50px;
  color: ${(p) => p.theme.text2};
`;

type Props = {
  type: 'success' | 'error';
  message: string;
  onClickSubmit: () => void;
};

export const AlertComponent = memo((props: Props) => {
  const { type, message, onClickSubmit } = props;

  return (
    <AlertBackground>
      <AlertContainer type={type}>
        <AlertTitle>{type === 'error' ? 'Error' : 'Success'}</AlertTitle>
        <AlertText>{message}</AlertText>
        <Button label="Close" onClick={onClickSubmit} />
      </AlertContainer>
    </AlertBackground>
  );
});
