import React, { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ModalRests } from "../ModalRests";
import Loading from "../loading";
import { useLazyCompanyQuery, useUpdateCompanyMutation } from "./api";
import FormikInput from "../FormikInput";
import { Form, Formik, FormikHelpers, useFormikContext } from "formik";
import styled from "@emotion/styled";
import FormikSelect from "../Select/FormikSelect";
import { languages } from "../../utils/timezones";
import { CompanyTranslation } from "./CompanyTranslations";
import { useAuth } from "../Auth/Context";
import { UniversalList } from "../../styles";

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
        footerSticks={[
          {
            icon: "save",
          },
        ]}
        isGeneral
        isLoading={isLoading || isFetching}
      >
        <UniversalListCompany>
          <FormikInput label={i18n.t("company.title")} name="title" mb />
          <FormikInput label={i18n.t("company.tin")} name="tin" mb />
          <FormikInput label={i18n.t("company.loginPrefix")} name="login" mb />
          <FormikInput label={i18n.t("company.email")} name="email" mb />
          <FormikInput label={i18n.t("company.currencySymbol")} name="currency_symbol" mb />
          <FormikSelect
            label={i18n.t("company.defaultLanguage")}
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
  const i18n = useTranslation();
  const [updateCompany, { isLoading }] = useUpdateCompanyMutation();
  const id = Number(useAuth()?.whoami?.company?.id);

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      validate={(values) => {
        const errors: any = {};
        if (!values.email) {
          errors.email = i18n.t("company.emailReq");
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          errors.email = i18n.t("company.emailInv");
        }
        if (!values.title) {
          errors.title = i18n.t("company.titleReq");
        }
        if (!values.tin) {
          errors.tin = i18n.t("company.tinReq");
        }
        if (!values.login) {
          errors.login = i18n.t("company.loginPrefixReq");
        }
        if (!values.currency_symbol) {
          errors.currency_symbol = i18n.t("company.currencySymbolReq");
        }
        if (!values.lang) {
          errors.lang = i18n.t("company.defaultLanguageReq");
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
