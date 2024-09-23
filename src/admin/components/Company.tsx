import { Form, Formik } from 'formik';
import { FC, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useAuth } from '../providers/Auth';
import { currencies, languages } from '../utils/timezones';

import { API } from '../api';
import { Alert } from '../providers/Alert';
import { Button } from './Button';
import { Card } from './Card';
import { CardScrollable } from './CardScrollable';
import { Input } from './Input';
import { Select } from './Select';
import { Wrapper, WrapperForm } from './Wrapper';

type Form = {
  title?: string;
  tin?: string;
  login?: string;
  email?: string;
  currency_symbol?: string;
  lang?: string;
  address?: string;
  phone?: string;
  google_maps_link?: string;
  instagram?: string;
  password?: string;
  repeat_password?: string;
  langs?: string[];
  pm?: {
    n: string;
    t: { [key: string]: string };
  }[];
};

export const Company: FC = () => {
  const i18n = useTranslation();
  const [updateCompany, { isLoading: isLoadingUpdate, isError, isSuccess }] =
    API.useUpdateCompanyMutation();
  const id = Number(useAuth()?.whoami?.company?.id);

  const { data, isLoading, isFetching } = API.useCompanyQuery();

  useEffect(() => {
    if (isError) {
      Alert.error(i18n.t('company.error'));
    }
  }, [isError, i18n]);

  useEffect(() => {
    if (isSuccess) {
      Alert.success(i18n.t('company.success'));
    }
  }, [isSuccess, i18n]);

  const validate = useCallback(
    (values: Form) => {
      const errors: Form = {};
      if (!values.email) {
        errors.email = i18n.t('company.validation.email_req');
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = i18n.t('company.validation.email_inv');
      }
      if (!values.title) errors.title = i18n.t('company.validation.title_req');
      if (!values.tin) {
        errors.tin = i18n.t('company.validation.tin_req');
      } else if (!/^[0-9]+$/i.test(values.tin)) {
        errors.tin = i18n.t('company.validation.tin_num');
      } else if (values.tin.length < 10 || values.tin.length > 12) {
        errors.tin = i18n.t('company.validation.tin_min_num');
      }
      if (!values.login) {
        errors.login = i18n.t('company.validation.ligin_req');
      } else if (!/^[a-zA-Z0-9]+$/i.test(values.login)) {
        errors.login = i18n.t('company.validation.login_must');
      }
      if (!!values.password || !!values.repeat_password) {
        if (!values.password) {
          errors.password = i18n.t('company.validation.passw_req');
        } else if (values.password.length < 4) {
          errors.password = i18n.t('company.validation.passw_must');
        }
        if (!values.repeat_password)
          errors.repeat_password = i18n.t('company.validation.repeat_req');
        if (values.password?.toString() !== values.repeat_password?.toString())
          errors.repeat_password = i18n.t('company.validation.repeat_same');
      }
      if (!values.lang) errors.lang = i18n.t('company.validation.lang_req');
      if (!values.currency_symbol)
        errors.currency_symbol = i18n.t('company.validation.curr_req');

      return errors;
    },
    [i18n],
  );

  const onSubmit = useCallback((values: Form) => {
    updateCompany({
      id,
      title: values.title ?? '',
      tin: values.tin ?? '',
      login: values.login ?? '',
      email: values.email ?? '',
      currency_symbol: values.currency_symbol ?? '',
      lang: values.lang ?? 'en',
      address: values.address ?? '',
      instagram: values.instagram ?? '',
      phone: values.phone ?? '',
      google_maps_link: values.google_maps_link ?? '',
      langs: values.langs ?? [],
      password: values.password ?? undefined,
      pm: values.pm ?? undefined,
    });
  }, []);

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={onSubmit}
      validate={validate}
      initialValues={{
        id: '',
        title: data?.title ?? '',
        tin: data?.tin ?? '',
        login: data?.login ?? '',
        email: data?.email ?? '',
        currency_symbol: data?.currency_symbol ?? '',
        address: data?.address ?? '',
        phone: data?.phone ?? '',
        google_maps_link: data?.google_maps_link ?? '',
        instagram: data?.instagram ?? '',
        langs: data?.langs ?? [],
        lang: data?.lang ?? '',
        pm: data?.pm ?? [],
      }}
      enableReinitialize={true}
    >
      {(props) => (
        <WrapperForm>
          <Wrapper
            header={{
              title: i18n.t('company.header'),
              subTitle: i18n.t('company.header'),
            }}
            isLoading={isLoading || isFetching}
            buttons={[
              {
                isLoading: isLoadingUpdate,

                label: i18n.t('common.save'),
                isSubmit: true,
              },
            ]}
          >
            <Card
              header={{
                title: i18n.t('company.systemInfo'),
                subTitle: i18n.t('company.systemInfoSubtitle'),
              }}
            >
              <Input
                type="text"
                label={i18n.t('company.title')}
                name="title"
                disabled={isLoadingUpdate}
              />
              <Input
                type="text"
                label={i18n.t('company.tin')}
                name="tin"
                disabled={isLoadingUpdate}
              />
              <Input
                type="text"
                label={i18n.t('company.loginPrefix')}
                name="login"
                disabled={isLoadingUpdate}
              />
              <Select
                name="currency_symbol"
                label={i18n.t('company.currencySymbol')}
                options={currencies.map((l) => ({
                  label: l.name,
                  value: l.symbol,
                }))}
                disabled={isLoadingUpdate}
              />
              <Select
                name="lang"
                label={i18n.t('company.defaultLanguage')}
                options={languages.map((l) => ({
                  label: l.name,
                  value: l.code,
                }))}
                disabled={isLoadingUpdate}
              />
            </Card>
            <Card
              header={{
                title: i18n.t('company.public_title'),
                subTitle: i18n.t('company.public_sub_title'),
              }}
            >
              <Input
                type="text"
                label={i18n.t('company.email')}
                name="email"
                disabled={isLoadingUpdate}
              />
              <Input
                type="text"
                label={i18n.t('company.address')}
                name="address"
                disabled={isLoadingUpdate}
              />
              <Input
                type="text"
                label={i18n.t('company.google_maps_link')}
                name="google_maps_link"
                disabled={isLoadingUpdate}
              />
              <Input
                type="text"
                label={i18n.t('company.instagram')}
                name="instagram"
                disabled={isLoadingUpdate}
              />
              <Input
                type="text"
                label={i18n.t('company.phone')}
                name="phone"
                disabled={isLoadingUpdate}
              />
            </Card>
            <Card
              header={{
                title: i18n.t('company.productLangsTitle'),
                subTitle: i18n.t('company.productLangsDescription'),
              }}
            >
              <CardScrollable
                elements={
                  props.values.langs?.map((lang, idx) => (
                    <>
                      <Select
                        label={i18n.t('company.translation.select')}
                        name={`langs.[${idx}]`}
                        options={languages
                          .filter(
                            (l) =>
                              !props.values?.langs?.includes(
                                l.code.toString(),
                              ) && props.values?.lang !== l.code,
                          )
                          .concat(
                            languages.filter((l) => l.code === lang) ?? [],
                          )
                          .map((l) => ({ label: l.name, value: l.code }))}
                        disabled={isLoadingUpdate}
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
              />
            </Card>
            <Card
              header={{
                title: i18n.t('company.paymentMethodsTitle'),
                subTitle: i18n.t('company.paymentMethodsDescription'),
              }}
              noWrap
            >
              <CardScrollable
                elements={
                  props.values.pm?.map((_, idx) => (
                    <>
                      <Input
                        name={`pm.[${idx}].n`}
                        label={
                          props.values.lang?.toUpperCase() +
                          i18n.t('company.paymentMethods.name')
                        }
                        type={'text'}
                        disabled={isLoadingUpdate}
                      />
                      {props.values.langs?.map((lang) => (
                        <Input
                          name={`pm.[${idx}].t.${lang}`}
                          label={
                            lang.toUpperCase() +
                            i18n.t('company.paymentMethods.name')
                          }
                          type={'text'}
                          disabled={isLoadingUpdate}
                        />
                      ))}
                      <Button
                        color="secondary"
                        size="small"
                        label={i18n.t('common.remove')}
                        onClick={() => {
                          props.setValues({
                            ...props.values,
                            pm: [...(props.values.pm ?? [])].filter(
                              (_: unknown, index: number) => index !== idx,
                            ),
                          });
                        }}
                        disabled={isLoadingUpdate}
                      />
                    </>
                  )) ?? []
                }
                onPlus={() => {
                  if (isLoadingUpdate) return null;

                  props.setValues({
                    ...props.values,
                    pm: [
                      ...(props.values.pm ?? []),
                      {
                        n: '',
                        t:
                          props.values.langs?.reduce(
                            (acc, lang) => ({ ...acc, [lang]: '' }),
                            {},
                          ) ?? {},
                      },
                    ],
                  });
                }}
              />
            </Card>
            {/* <Card
              header={{
                title: i18n.t('company.new_password_title'),
                subTitle: i18n.t('company.new_password_sub_title'),
              }}
            >
              <Input
                type="password"
                label={i18n.t('company.password')}
                name="password"
                disabled={isLoadingUpdate}
              />
              <Input
                type="password"
                label={i18n.t('company.repeat_password')}
                name="repeat_password"
                disabled={isLoadingUpdate}
              />
            </Card> */}
          </Wrapper>
        </WrapperForm>
      )}
    </Formik>
  );
};
