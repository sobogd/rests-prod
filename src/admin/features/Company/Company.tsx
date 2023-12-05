import React, { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ModalRests } from "../../shared/ModalRests";
import Loading from "../../shared/loading";
import { useLazyCompanyQuery, useUpdateCompanyMutation } from "./api";
import { UniversalList } from "../../app/styles";
import FormikInput from "../../shared/FormikInput";
import { Form, Formik, FormikHelpers, useFormikContext } from "formik";
import { useAppSelector } from "../../app/store";
import styled from "@emotion/styled";
import FormikSelect from "../../shared/FormikSelect";
import { languages } from "../../utils/timezones";
import { CompanyTranslation } from "./CompanyTranslations";
import { useAuth } from "../Auth/Context";

const UniversalListCompany = styled(UniversalList)`
  padding: 20px 15px;
`;

interface ICompanyValues {
  title?: string;
  tin?: string;
  login?: string;
  email?: string;
  currency_symbol?: string;
  lang?: string;
  langs?: string[];
}

export const CompanyForm: React.FC = () => {
  const i18n = useTranslation();

  const { setValues } = useFormikContext();
  const [load, { data, isLoading, isFetching }] = useLazyCompanyQuery();

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (data) {
      setValues({
        title: data.title ?? "",
        tin: data.tin ?? "",
        login: data.login ?? "",
        email: data.email ?? "",
        currency_symbol: data.currency_symbol ?? "",
        lang: data.lang ?? "",
        langs: data.langs ?? [],
      });
    } else {
    }
  }, [data]);

  return (
    <Form>
      <ModalRests
        title={i18n.t("menu.names.COMPANY")}
        isHaveMenu={true}
        footerButton={{ title: "Save", isSubmit: true }}
      >
        <Loading isLoading={isLoading || isFetching} />
        <UniversalListCompany>
          <FormikInput label="Title" name="title" mb />
          <FormikInput label="Tin" name="tin" mb />
          <FormikInput label="Login prefix" name="login" mb />
          <FormikInput label="Email" name="email" mb />
          <FormikInput label="Currency symbol" name="currency_symbol" mb />
          <FormikSelect
            label="Default language"
            name="lang"
            options={languages.map((l) => ({ label: l.name, value: l.code }))}
            mb
          />
          <CompanyTranslation />
        </UniversalListCompany>
      </ModalRests>
    </Form>
  );
};

export const Company: FC = () => {
  const [updateCompany, { isLoading }] = useUpdateCompanyMutation();
  const id = Number(useAuth()?.whoami?.company?.id);

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      validate={(values) => {
        const errors: any = {};
        if (!values.email) {
          errors.email = "Email is required";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          errors.email = "Invalid email address";
        }
        if (!values.title) {
          errors.title = "Title is required";
        }
        if (!values.tin) {
          errors.tin = "Tin is required";
        }
        if (!values.login) {
          errors.login = "Login prefix is required";
        }
        if (!values.currency_symbol) {
          errors.currency_symbol = "Currency symbol is required";
        }
        if (!values.lang) {
          errors.lang = "Language is required";
        }
        return errors;
      }}
      initialValues={{}}
      onSubmit={(values: ICompanyValues, { setSubmitting }: FormikHelpers<ICompanyValues>) => {
        updateCompany({
          id,
          title: values.title ?? "",
          tin: values.tin ?? "",
          login: values.login ?? "",
          email: values.email ?? "",
          currency_symbol: values.currency_symbol ?? "",
          lang: values.lang ?? "en",
          langs: values.langs ?? [],
        }).then(() => {
          setSubmitting(false);
        });
      }}
    >
      <>
        <Loading isLoading={isLoading} />
        <CompanyForm />
      </>
    </Formik>
  );
};
