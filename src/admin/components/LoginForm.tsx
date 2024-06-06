import styled from '@emotion/styled';
import { Formik, Form } from 'formik';
import { useCallback, useEffect } from 'react';

import { API } from '../api';
import { Alert } from '../providers/Alert';

import { Button } from './Button';
import { Input } from './Input';

const Fullscreen = styled(Form)`
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

const FormContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px 0;
  justify-content: flex-end;
`;

const Description = styled.div`
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

type Props = {
  onRegister: () => void;
  afterSuccessLogin: (name: string, hash: string, token: string) => void;
};

type Form = {
  login?: string;
  password?: string;
};

export const LoginForm = (props: Props) => {
  const { onRegister, afterSuccessLogin } = props;

  const [auth, { isLoading, isSuccess, isError, data }] = API.useAuthMutation();

  useEffect(() => {
    if (isSuccess && data?.token && data?.name && data?.loginHash) {
      afterSuccessLogin(data.name, data.loginHash, data.token);
    }
  }, [isSuccess, data, afterSuccessLogin]);

  useEffect(() => {
    if (isError) {
      Alert.error('Login or password incorrect!');
    }
  }, [isError]);

  const onSubmit = useCallback(
    (values: Form) => {
      if (values?.login?.length && values?.password?.length) {
        auth({ login: values.login, password: values.password });
      }
    },
    [auth],
  );

  const validate = useCallback((values: Form) => {
    const errors: Form = {};
    if (!values.login) {
      errors.login = 'Login is required';
    } else if (values.login?.split('-')?.length !== 2) {
      errors.login = 'Fill login in format XXX-xxxxx';
    }
    if (!values.password) errors.password = 'Password is required';

    return errors;
  }, []);

  return (
    <Formik
      initialValues={{ login: '', password: '' }}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={onSubmit}
      validate={validate}
    >
      {() => (
        <Fullscreen autoComplete="false">
          <Title>
            The best
            <br />
            solution
            <br />
            for your
            <br />
            restaurant
          </Title>
          <SubTitle>Enter your credentials:</SubTitle>
          <FormContainer>
            <Input type="text" label="Login" name="login" />
            <Input type="password" label="Password" name="password" />
          </FormContainer>
          <Description>
            Don't have an account? <Link onClick={onRegister}>Register</Link>
          </Description>
          <Button isLoading={isLoading} label={'Sign In'} isSubmit />
        </Fullscreen>
      )}
    </Formik>
  );
};
