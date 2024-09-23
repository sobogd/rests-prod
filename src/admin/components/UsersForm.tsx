import styled from '@emotion/styled';
import { Form, Formik } from 'formik';
import { memo, useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { EUserTypes } from '../../back/types';
import { API } from '../api';
import { Alert } from '../providers/Alert';
import { ButtonProps } from './Button';
import { Card } from './Card';
import { Input } from './Input';
import { Select } from './Select';
import { Wrapper, WrapperForm } from './Wrapper';

const Fullscreen = styled(Form)`
  background: ${(p) => p.theme.background1};
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px;
  gap: 30px;
  margin: 0 auto;
  overflow-y: scroll;
`;

type Props = {
  onBack: () => void;
  id: number | null;
};

type Form = {
  name?: string;
  login?: string;
  password?: string;
  repeat_password?: string;
  type?: EUserTypes;
};

export const UsersForm = memo((props: Props) => {
  const { onBack, id } = props;

  const i18n = useTranslation();

  const { data, isLoading, isFetching, refetch } = API.useUserQuery(id!, {
    skip: !id,
    refetchOnMountOrArgChange: true,
  });

  const [
    createOrUpdate,
    { isLoading: isLoadingCreatingOrUpdating, isSuccess, isError },
  ] = API.useUserCreateOrUpdateMutation();

  const [
    remove,
    {
      isLoading: isLoadingRemoving,
      isSuccess: isSuccessRemoving,
      isError: isErrorRemoving,
    },
  ] = API.useUserDeleteMutation();

  useEffect(() => {
    if (isSuccess) {
      Alert.success(i18n.t('users.success'), onBack);
    }
  }, [isSuccess, i18n, onBack]);

  useEffect(() => {
    if (isError) {
      Alert.error(i18n.t('users.error'));
    }
  }, [isError, i18n]);

  useEffect(() => {
    if (isSuccessRemoving) {
      Alert.success(i18n.t('users.success_removing'), onBack);
    }
  }, [isSuccessRemoving, i18n, onBack]);

  useEffect(() => {
    if (isErrorRemoving) {
      Alert.error(i18n.t('users.error_removing'));
    }
  }, [isErrorRemoving, i18n]);

  const validate = useCallback(
    (values: Form) => {
      const errors: Form = {};

      if (!values.type) {
        errors.type = i18n.t('users.valid.type') as EUserTypes;
      }

      if (!values.name) {
        errors.name = i18n.t('users.valid.name');
      }

      if (!values.login) {
        errors.login = i18n.t('users.valid.login');
      } else if (!/^[a-zA-Z0-9]+$/i.test(values.login)) {
        errors.login = i18n.t('users.valid.login_must');
      }

      const ifNewUser = id === null;

      console.log('ifNewUser', ifNewUser);

      if (ifNewUser || !!values.password || !!values.repeat_password) {
        if (!values.password) {
          errors.password = i18n.t('users.valid.passw_req');
        } else if (values.password.length < 4) {
          errors.password = i18n.t('users.valid.passw_must');
        }
        if (!values.repeat_password)
          errors.repeat_password = i18n.t('users.valid.repeat_req');
        if (values.password?.toString() !== values.repeat_password?.toString())
          errors.repeat_password = i18n.t('users.valid.repeat_same');
      }

      return errors;
    },
    [i18n, id],
  );

  const onSubmit = useCallback((values: Form) => {
    createOrUpdate({
      id: id ?? undefined,
      name: values.name ?? '',
      login: values.login ?? '',
      type: values.type ?? undefined,
      password: values.password ?? undefined,
    });
  }, []);

  const onRemove = useCallback(
    (id: number) => {
      remove(id);
    },
    [remove],
  );

  const userTypes = [
    {
      label: i18n.t('users.form.admin'),
      value: EUserTypes.ADMIN,
    },
    {
      label: i18n.t('users.form.kitchen'),
      value: EUserTypes.KITCHEN,
    },
    {
      label: i18n.t('users.form.manager'),
      value: EUserTypes.MANAGER,
    },
    {
      label: i18n.t('users.form.personal'),
      value: EUserTypes.PERSONAL,
    },
  ];

  const buttons = useMemo(() => {
    const array: ButtonProps[] = [
      {
        isLoading: isLoadingCreatingOrUpdating,
        label: i18n.t('common.save'),
        isSubmit: true,
      },
    ];

    if (id) {
      array.push({
        isLoading: isLoadingRemoving,
        label: i18n.t('common.remove'),
        color: 'error',
        onClick: () => {
          onRemove(id);
        },
      });
    }

    return array;
  }, [i18n, isLoadingCreatingOrUpdating, id]);

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={onSubmit}
      validate={validate}
      initialValues={{
        name: data?.name,
        login: data?.login,
        type: data?.type,
      }}
      enableReinitialize={true}
    >
      {() => (
        <WrapperForm>
          <Wrapper
            isLoading={isLoading || isFetching}
            header={{
              onBack: onBack,
              title: id
                ? i18n.t('users.edit_title')
                : i18n.t('users.add_title'),
              subTitle: id
                ? i18n.t('users.edit_sub_title')
                : i18n.t('users.add_sub_title'),
            }}
            buttons={buttons}
          >
            <Card
              header={{
                title: i18n.t('users.general_title'),
                subTitle: i18n.t('users.general_subtitle'),
              }}
            >
              <Select
                name="type"
                label={i18n.t('users.form.type')}
                options={userTypes}
                disabled={isLoadingCreatingOrUpdating}
              />
              <Input
                type="text"
                name="name"
                label={i18n.t('users.form.name')}
                disabled={isLoadingCreatingOrUpdating}
              />
              <Input
                type="text"
                name="login"
                label={i18n.t('users.form.login')}
                disabled={isLoadingCreatingOrUpdating}
              />
            </Card>
            <Card
              header={{
                title: i18n.t('users.password_title'),
                subTitle: id
                  ? i18n.t('users.password_title_exist')
                  : i18n.t('users.password_title_new'),
              }}
            >
              <Input
                name="password"
                label={i18n.t('users.form.password')}
                type="password"
                disabled={isLoadingCreatingOrUpdating}
              />
              <Input
                name="repeat_password"
                label={i18n.t('users.form.password2')}
                type="password"
                disabled={isLoadingCreatingOrUpdating}
              />
            </Card>
          </Wrapper>
        </WrapperForm>
      )}
    </Formik>
  );
});
