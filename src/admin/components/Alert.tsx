import styled from '@emotion/styled';
import { memo } from 'react';

import { AlertState } from '../providers/Alert';
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

const AlertContainer = styled.div<{ type: 'error' | 'success' | 'ask' }>`
  background: ${(p) => p.theme.background1};
  border-radius: 25px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 250px;
  max-width: 320px;
  width: 100%;
  margin: 30px;
  align-items: center;
  justify-content: center;
`;

const AlertTitle = styled.div`
  font-size: 30px;
  line-height: 30px;
  font-weight: 600;
  color: ${(p) => p.theme.text1};
  text-align: center;
  width: 100%;
`;

const AlertText = styled.div`
  margin-bottom: 20px;
  color: ${(p) => p.theme.text2};
  text-align: center;
  width: 100%;
`;

type Props = {
  type: 'success' | 'error' | 'ask';
  message: string;
  alertState: AlertState;
  setAlertState: (alertState: AlertState) => void;
};

export const AlertComponent = memo((props: Props) => {
  const { type, message, alertState, setAlertState } = props;

  return (
    <AlertBackground>
      <AlertContainer type={type}>
        <AlertTitle>
          {type === 'error'
            ? 'Error'
            : type === 'ask'
            ? 'Are you sure?'
            : 'Success'}
        </AlertTitle>
        <AlertText>{message}</AlertText>
        {!!alertState?.onClose && (
          <Button
            label="Close"
            onClick={() => {
              alertState?.onClose?.();
              setAlertState(undefined);
            }}
            fullWidth={false}
          />
        )}
        {!!alertState?.onYes && (
          <Button
            label="Yes"
            onClick={() => {
              alertState?.onYes?.();
              setAlertState(undefined);
            }}
            fullWidth={false}
          />
        )}
        {!!alertState?.onNo && (
          <Button
            label="No"
            onClick={() => {
              alertState?.onNo?.();
              setAlertState(undefined);
            }}
            fullWidth={false}
            color="secondary"
          />
        )}
      </AlertContainer>
    </AlertBackground>
  );
});
