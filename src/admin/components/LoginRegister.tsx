import styled from '@emotion/styled';
import { Form, Formik } from 'formik';
import { useEffect } from 'react';

import { API } from '../api';
import { Alert } from '../providers/Alert';
import { currencies, languages } from '../utils/timezones';

import { Button } from './Button';
import { Input } from './Input';
import { Select } from './Select';

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
  overflow-y: auto;
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

interface IRegistrationForm {
  email?: string;
  title?: string;
  registerL?: string;
  tin?: string;
  registerP?: string;
  passwordRepeat?: string;
  currency?: string;
  lang?: string;
}

type Props = {
  onLogin: () => void;
  afterSuccessRegister: (login: string) => void;
};

export const LoginRegister = (props: Props) => {
  const { onLogin, afterSuccessRegister } = props;

  const [register, { data, isLoading, isError, isSuccess }] =
    API.useRegisterMutation();

  useEffect(() => {
    if (isSuccess && data?.login) {
      afterSuccessRegister(data.login);
    }
  }, [isSuccess, data, afterSuccessRegister]);

  useEffect(() => {
    if (isError) {
      Alert.error('Error while register!');
    }
  }, [isError]);

  return (
    <Formik
      initialValues={{}}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={
        (values: IRegistrationForm) =>
          !data?.login
            ? register({
                email: values.email ?? '',
                title: values.title ?? '',
                tin: values.tin ?? '',
                login: values.registerL ?? '',
                password: values.registerP ?? '',
                lang: values.lang ?? '',
                currency: values.currency ?? '',
              })
            : undefined //setTab('login')
      }
      validate={(values) => {
        const errors: IRegistrationForm = {};
        if (!values.email) {
          errors.email = 'Email is required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        if (!values.title) errors.title = 'Title is required';
        if (!values.tin) {
          errors.tin = 'Tin is required';
        } else if (!/^[0-9]+$/i.test(values.tin)) {
          errors.tin = 'Tin must have only numbers';
        } else if (values.tin.length < 10 || values.tin.length > 12) {
          errors.tin = 'Tin must have 10-12 numbers';
        }
        if (!values.registerL) {
          errors.registerL = 'Login is required';
        } else if (!/^[a-zA-Z0-9]+$/i.test(values.registerL)) {
          errors.registerL = 'Login must have only letters or numbers';
        }
        if (!values.registerP) {
          errors.registerP = 'Password is required';
        } else if (values.registerP.length < 4) {
          errors.registerP = 'Password must have more than 4 sybmols';
        }
        if (!values.passwordRepeat)
          errors.passwordRepeat = 'Repeat the password';
        if (values.registerP?.toString() !== values.passwordRepeat?.toString())
          errors.passwordRepeat = 'Passwords not same';
        if (!values.lang) errors.lang = 'Language is required';
        if (!values.currency) errors.currency = 'Currency is required';

        return errors;
      }}
    >
      <Fullscreen>
        <Title>
          New
          <br />
          company
        </Title>
        <SubTitle>Fill information:</SubTitle>
        <FormContainer>
          <Input type="email" label="Email" name="email" />
          <Input type="text" label="Title" name="title" />
          <Input type="text" label="TIN" name="tin" />
          <Input type="text" label="Login" name="registerL" />
          <Input type="password" label="Password" name="registerP" />
          <Input
            type="password"
            label="Repeat password"
            name="passwordRepeat"
          />
          <Select
            name="lang"
            label="Language"
            options={languages.map((l) => ({
              label: l.name,
              value: l.code,
            }))}
          />
          <Select
            name="currency"
            label="Currency"
            options={currencies.map((l) => ({
              label: l.name,
              value: l.symbol,
            }))}
          />
        </FormContainer>
        <Description>
          Back to login? <Link onClick={onLogin}>Sign up</Link>
        </Description>
        <Button isLoading={isLoading} label="Register" isSubmit />
      </Fullscreen>
    </Formik>
  );
};
