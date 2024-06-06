import styled from '@emotion/styled';
import { useCallback, useEffect } from 'react';

import { API } from '../api';

import { Button } from './Button';

const Fullscreen = styled.div`
  background: ${(p) => p.theme.background1};
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px;
  gap: 12px;
  max-width: 450px;
  margin: 0 auto;
`;

const Title = styled.div`
  color: ${(props) => props.theme.text1};
  font-weight: 600;
  font-size: 60px;
  line-height: 60px;
`;

const SubTitle = styled.div`
  color: ${(props) => props.theme.text2};
  font-size: 20px;
`;

const Description = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  font-size: 14px;
  color: ${(p) => p.theme.text3};
  gap: 5px;
`;

const Link = styled.span`
  color: ${(p) => p.theme.text1};
  cursor: pointer;
  transition: 0.2s;

  :hover {
    opacity: 0.8;
  }
`;

const Error = styled.div`
  display: flex;
  justify-content: flex-start;
  color: ${(p) => p.theme.error};
`;

type Props = {
  onBack: () => void;
  afterSuccessLogin: (name: string, hash: string, token: string) => void;
};

export const LoginLast = (props: Props) => {
  const { onBack, afterSuccessLogin } = props;

  const loginUserName = localStorage.getItem('restsLoginUserName');

  const [authByHash, { isError, isLoading, isSuccess, data }] =
    API.useAuthByHashMutation();

  useEffect(() => {
    if (isSuccess && data?.token && data?.name && data?.loginHash) {
      afterSuccessLogin(data.name, data.loginHash, data.token);
    }
  }, [isSuccess, data, afterSuccessLogin]);

  const onClickLogin = useCallback(() => {
    const hash = localStorage.getItem('restsLoginHash');

    if (hash) {
      authByHash(hash);
    }
  }, [authByHash]);

  return (
    <Fullscreen>
      <Title>Welcome Back!</Title>
      <SubTitle>Last time you logged as {loginUserName}</SubTitle>
      {isError ? (
        <Error>
          There are have some errors.
          <br />
          Please try again later.
        </Error>
      ) : null}
      <Description>
        Another account? <Link onClick={onBack}>Change</Link>
      </Description>
      <Button
        onClick={onClickLogin}
        disabled={isLoading}
        label="Go to system"
        isLoading={isLoading}
      />
    </Fullscreen>
  );
};
