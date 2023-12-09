import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ModalRests } from "../ModalRests";
import { Form, Formik, useFormikContext } from "formik";
import {
  useMethodUpdateMutation,
  useLazyMethodQuery,
  useMethodCreateMutation,
  useMethodDeleteMutation,
} from "./api";
import FormikInput from "../FormikInput";
import { Notice } from "../../hooks/useNotification";

export interface Values {
  title?: string;
  description?: string;
}

interface Props {
  onBack: () => void;
  refetch: () => void;
  selectedMethodId: number | null | undefined;
  isLoading?: boolean;
}

const defaultValues = {
  title: "",
  description: "",
};

const MethodFormComponent: FC<Props> = ({ onBack, selectedMethodId, isLoading, refetch }) => {
  const { t } = useTranslation();
  const { setValues, resetForm } = useFormikContext();
  const [loadMethod, { data, isLoading: isMethodLoading, isFetching }] = useLazyMethodQuery();
  const [deleteMethod, { isLoading: isDeleting }] = useMethodDeleteMutation();

  useEffect(() => {
    if (selectedMethodId) {
      loadMethod(selectedMethodId);
    } else {
      setValues(defaultValues);
    }
  }, [selectedMethodId]);

  useEffect(() => {
    if (data && selectedMethodId != null) {
      setValues({
        title: data.title,
        description: data.description,
      });
    } else {
      setValues(defaultValues);
    }
  }, [data, selectedMethodId]);

  const handleBack = () => {
    onBack();
    resetForm();
    setValues(defaultValues);
  };

  return (
    <Form>
      <ModalRests
        isShow={selectedMethodId !== undefined ? true : false}
        title={selectedMethodId === null ? t("methods.form.new") : t("methods.form.edit")}
        onBack={handleBack}
        footerSticks={[{ icon: "save" }]}
        isLoading={isLoading || isMethodLoading || isFetching || isDeleting}
        withPadding
        moreButtons={
          selectedMethodId != null
            ? [
                {
                  title: t("methods.form.remove"),
                  onClick: () =>
                    deleteMethod(selectedMethodId ?? 0).then(() => {
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
          <FormikInput name="title" label={t("methods.form.title")} mb />
          <FormikInput name="description" label={t("methods.form.description")} mb />
        </div>
      </ModalRests>
    </Form>
  );
};

export const MethodForm: FC<Props> = (props) => {
  const { t } = useTranslation();
  const [createMethod, { isLoading: isCreating }] = useMethodCreateMutation();
  const [updateMethod, { isLoading: isUpdating }] = useMethodUpdateMutation();

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      validate={(values) => {
        const errors: any = {};
        if (!values.title) errors.title = t("methods.form.titleReq");
        if (!values.description) errors.description = t("methods.form.descriptionReq");
        return errors;
      }}
      initialValues={defaultValues}
      onSubmit={(values: Values, { resetForm, setValues, setSubmitting }) => {
        const method = !props.selectedMethodId ? createMethod : updateMethod;
        method({
          id: props.selectedMethodId || undefined,
          title: values?.title ?? "",
          description: values?.description ?? "",
        }).then((res) => {
          // @ts-expect-error
          if (!!res.error) {
            Notice.error(t("methods.form.error"));
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
      <MethodFormComponent {...props} isLoading={isCreating || isUpdating} />
    </Formik>
  );
};
