import { Form, Formik } from 'formik';
import { memo, useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { API } from '../api';
import { Alert } from '../providers/Alert';
import { ButtonProps } from './Button';
import { Card } from './Card';
import { Wrapper, WrapperForm } from './Wrapper';

type Props = {
  onBack: () => void;
  id: number | null;
};

type Form = {
  id?: number;
  name?: string;
  description?: string;
  sort?: number;
  translations?: {
    l?: string;
    t?: string;
  }[];
};

export const CategoriesForm = memo((props: Props) => {
  const { onBack, id } = props;

  const i18n = useTranslation();

  const { data, isLoading, isFetching, refetch } = API.useCategoryQuery(id!, {
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

      // if (!values.type) {
      //   errors.type = i18n.t('users.valid.type') as EUserTypes;
      // }

      // if (!values.name) {
      //   errors.name = i18n.t('users.valid.name');
      // }

      // if (!values.login) {
      //   errors.login = i18n.t('users.valid.login');
      // } else if (!/^[a-zA-Z0-9]+$/i.test(values.login)) {
      //   errors.login = i18n.t('users.valid.login_must');
      // }

      // const ifNewUser = id === null;

      // console.log('ifNewUser', ifNewUser);

      // if (ifNewUser || !!values.password || !!values.repeat_password) {
      //   if (!values.password) {
      //     errors.password = i18n.t('users.valid.passw_req');
      //   } else if (values.password.length < 4) {
      //     errors.password = i18n.t('users.valid.passw_must');
      //   }
      //   if (!values.repeat_password)
      //     errors.repeat_password = i18n.t('users.valid.repeat_req');
      //   if (values.password?.toString() !== values.repeat_password?.toString())
      //     errors.repeat_password = i18n.t('users.valid.repeat_same');
      // }

      return errors;
    },
    [i18n, id],
  );

  const onSubmit = useCallback((values: Form) => {
    // createOrUpdate({
    //   id: id ?? undefined,
    //   name: values.name ?? '',
    //   login: values.login ?? '',
    //   type: values.type ?? undefined,
    //   password: values.password ?? undefined,
    // });
  }, []);

  const onRemove = useCallback(
    (id: number) => {
      remove(id);
    },
    [remove],
  );

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
      }}
      enableReinitialize={true}
    >
      {(props) => (
        <WrapperForm>
          <Wrapper
            isLoading={isLoading || isFetching}
            header={{
              onBack: onBack,
              title: id
                ? i18n.t('categories.edit_title')
                : i18n.t('categories.add_title'),
              subTitle: id
                ? i18n.t('categories.edit_sub_title')
                : i18n.t('categories.add_sub_title'),
            }}
            buttons={buttons}
          >
            <Card
              header={{
                title: i18n.t('categories.langs'),
                subTitle: i18n.t('categories.langsDescription'),
              }}
            >
              {/* <CardScrollable
                elements={
                  props.values.translations?.map((translation, idx) => (
                    <>
                      <Input
                        type="text"
                        label={i18n.t('company.loginPrefix')}
                        name="login"
                        disabled={isLoadingCreatingOrUpdating}
                      />
                      <Button
                        color="secondary"
                        size="small"
                        label={i18n.t('common.remove')}
                        onClick={() => {
                          Alert.ask(
                            'вы уверены',
                            () => {
                              props.setValues({
                                ...props.values,
                                langs: [...(props.values.langs ?? [])].filter(
                                  (_: unknown, index: number) => index !== idx,
                                ),
                              });
                            },
                            () => {},
                          );
                        }}
                        isLoading={isLoadingUpdate}
                      />
                    </>
                  )) ?? []
                }
                onPlus={() => {
                  if (isLoadingUpdate) return null;

                  const newCode =
                    languages
                      .find(
                        (l) =>
                          !props.values?.langs?.includes(l.code?.toString()) &&
                          props.values?.lang !== l.code,
                      )
                      ?.code?.toString() ?? 'en';

                  props.setValues({
                    ...props.values,
                    langs: [...(props.values.langs ?? []), newCode],
                    pm:
                      props.values.pm?.map((pm) => ({
                        ...pm,
                        t: {
                          ...pm.t,
                          [newCode]: '',
                        },
                      })) ?? [],
                  });
                }}
              /> */}
            </Card>
          </Wrapper>
        </WrapperForm>
      )}
    </Formik>
  );
});
