import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ModalRests } from "../ModalRests";
import { Form, Formik, useFormikContext } from "formik";
import { useUserUpdateMutation, useLazyUserQuery, useUserCreateMutation, useUserDeleteMutation } from "./api";
import FormikInput from "../FormikInput";
import FormikSelect from "../Select/FormikSelect";
import { EUserTypes } from "../../../back/types";
import { Notice } from "../../hooks/useNotification";

export interface Values {
  name?: string;
  password?: string;
  passwordRepeat?: string;
  login?: string;
  type?: EUserTypes;
}

interface Props {
  onBack: () => void;
  refetch: () => void;
  selectedUserId: number | null | undefined;
  isLoading?: boolean;
}

const defaultValues = {
  name: "",
  login: "",
  type: EUserTypes.PERSONAL,
  password: "",
  passwordRepeat: "",
};

const UserFormComponent: FC<Props> = ({ onBack, selectedUserId, isLoading, refetch }) => {
  const { t } = useTranslation();
  const { setValues, resetForm } = useFormikContext();
  const [loadUser, { data, isLoading: isUserLoading, isFetching }] = useLazyUserQuery();
  const [deleteUser, { isLoading: isDeleting }] = useUserDeleteMutation();

  useEffect(() => {
    if (selectedUserId) {
      loadUser(selectedUserId);
    } else {
      setValues(defaultValues);
    }
  }, [selectedUserId]);

  useEffect(() => {
    if (data) {
      setValues({
        name: data.name,
        login: data.login,
        type: data.type,
      });
    }
  }, [data]);

  const handleBack = () => {
    onBack();
    resetForm();
    setValues(defaultValues);
  };

  return (
    <Form>
      <ModalRests
        isShow={selectedUserId !== undefined ? true : false}
        title={selectedUserId === null ? t("users.form.new") : t("users.form.edit")}
        onBack={handleBack}
        footerSticks={[{ icon: "save" }]}
        isLoading={isLoading || isUserLoading || isFetching || isDeleting}
        withPadding
        moreButtons={
          selectedUserId != null
            ? [
                {
                  title: t("users.form.remove"),
                  onClick: () =>
                    deleteUser(selectedUserId ?? 0).then(() => {
                      refetch();
                      onBack();
                      resetForm();
                      setValues(defaultValues);
                    }),
                },
              ]
            : undefined
        }
      >
        <div style={{ width: "100%", marginTop: "5px" }}>
          <FormikSelect
            name="type"
            label={t("users.form.permission")}
            mb
            firstDefault
            options={[
              { label: t("users.form.admin"), value: EUserTypes.ADMIN },
              { label: t("users.form.kitchen"), value: EUserTypes.KITCHEN },
              { label: t("users.form.manager"), value: EUserTypes.MANAGER },
              { label: t("users.form.personal"), value: EUserTypes.PERSONAL },
            ]}
          />
          <FormikInput name="name" label={t("users.form.name")} mb />
          <FormikInput name="login" label={t("users.form.login")} mb />
          <FormikInput name="password" label={t("users.form.password")} mb type="password" />
          <FormikInput name="passwordRepeat" label={t("users.form.password2")} mb type="password" />
        </div>
      </ModalRests>
    </Form>
  );
};

export const UserForm: FC<Props> = (props) => {
  const { t } = useTranslation();
  const [createUser, { isLoading: isCreating }] = useUserCreateMutation();
  const [updateUser, { isLoading: isUpdating }] = useUserUpdateMutation();

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      validate={(values) => {
        const errors: any = {};
        if (!values.name) errors.name = t("users.form.nameReq");
        if (!values.login) {
          errors.login = t("users.form.loginReq");
        } else if (!/^[a-zA-Z0-9]+$/i.test(values.login)) {
          errors.login = t("users.form.loginMust");
        }
        if (props.selectedUserId == null || values.password?.length > 0) {
          if (!values.password) {
            errors.password = t("users.form.passwordReq");
          } else if (values.password.length < 4) {
            errors.password = t("users.form.passwordMust");
          }
          if (!values.passwordRepeat) errors.passwordRepeat = t("users.form.passwordRepeat");
          if (values.password?.toString() !== values.passwordRepeat?.toString())
            errors.passwordRepeat = t("users.form.passwordSame");
        }
        return errors;
      }}
      initialValues={defaultValues}
      onSubmit={(values: Values, { resetForm, setValues, setSubmitting }) => {
        const method = !props.selectedUserId ? createUser : updateUser;
        method({
          id: props.selectedUserId || undefined,
          name: values?.name ?? "",
          login: values?.login ?? "",
          password: values?.password ?? undefined,
          type: values?.type,
        }).then((res) => {
          // @ts-expect-error
          if (!!res.error) {
            Notice.error(t("users.form.error"));
          } else {
            props.onBack();
            props.refetch();
            resetForm();
            setValues(defaultValues);
          }
        });
        setSubmitting(false);
      }}
    >
      <UserFormComponent {...props} isLoading={isCreating || isUpdating} />
    </Formik>
  );
};
