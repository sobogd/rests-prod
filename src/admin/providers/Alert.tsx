import { createContext, PropsWithChildren, useState } from 'react';

import { AlertComponent } from '../components/Alert';

export let Alert: {
  error: (message: string, onClose?: () => void) => void;
  success: (message: string, onClose?: () => void) => void;
  ask: (message: string, onYes?: () => void, onNo?: () => void) => void;
};

const AlertContext = createContext({});

export type AlertState =
  | {
      message: string;
      type: 'error' | 'success' | 'ask';
      onClose?: () => void;
      onYes?: () => void;
      onNo?: () => void;
    }
  | undefined;

export function AlertProvider(props: PropsWithChildren) {
  const { children } = props;

  const [alertState, setAlertState] = useState<AlertState>(undefined);

  Alert = {
    error(message: string, onClose?: () => void) {
      setAlertState({
        type: 'error',
        message,
        onClose,
      });
    },
    success(message: string, onClose?: () => void) {
      setAlertState({
        type: 'success',
        message,
        onClose,
      });
    },
    ask(message: string, onYes?: () => void, onNo?: () => void) {
      setAlertState({
        type: 'ask',
        message,
        onYes,
        onNo,
      });
    },
  };

  return (
    <AlertContext.Provider value={{}}>
      {alertState ? (
        <AlertComponent
          type={alertState.type}
          message={alertState.message}
          alertState={alertState}
          setAlertState={setAlertState}
        />
      ) : null}
      {children}
    </AlertContext.Provider>
  );
}
