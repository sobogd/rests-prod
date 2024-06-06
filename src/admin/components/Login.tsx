import { memo, useCallback, useState } from 'react';

import { LoginForm } from './LoginForm';
import { LoginLast } from './LoginLast';
import { LoginRegister } from './LoginRegister';

type TLogin = 'login' | 'remember' | 'register';

type Props = {
  afterSuccessLogin: (name: string, hash: string, token: string) => void;
};

export const Login = memo((props: Props) => {
  const { afterSuccessLogin } = props;

  const isHaveRemember = localStorage.getItem('restsLoginHash') !== null;
  const initialTab = isHaveRemember ? 'remember' : 'login';

  const [tab, setTab] = useState<TLogin>(initialTab);

  const goToLogin = useCallback(() => {
    setTab('login');
  }, []);

  const goToRegister = useCallback(() => {
    setTab('register');
  }, []);

  const afterSuccessRegister = useCallback(() => {
    setTab('login');
  }, []);

  if (tab === 'remember') {
    return (
      <LoginLast onBack={goToLogin} afterSuccessLogin={afterSuccessLogin} />
    );
  }

  if (tab === 'login') {
    return (
      <LoginForm
        onRegister={goToRegister}
        afterSuccessLogin={afterSuccessLogin}
      />
    );
  }

  return (
    <LoginRegister
      onLogin={goToLogin}
      afterSuccessRegister={afterSuccessRegister}
    />
  );
});
