import { PropsWithChildren, useState } from 'react';
import { createContext } from 'react';

import { AlertComponent } from '../components/Alert';

export let Alert: {
  error: (message: string) => void;
  success: (message: string) => void;
};

const AlertContext = createContext({});

type AlertState =
  | {
      message: string;
      type: 'error' | 'success';
    }
  | undefined;

export function AlertProvider(props: PropsWithChildren) {
  const { children } = props;

  const [alertState, setAlertState] = useState<AlertState>(undefined);

  Alert = {
    error(message: string) {
      setAlertState({
        type: 'error',
        message,
      });
    },
    success(message: string) {
      setAlertState({
        type: 'success',
        message,
      });
    },
  };

  return (
    <AlertContext.Provider value={{}}>
      {alertState ? (
        <AlertComponent
          type={alertState.type}
          message={alertState.message}
          onClickSubmit={() => setAlertState(undefined)}
        />
      ) : null}
      {children}
    </AlertContext.Provider>
  );
}
