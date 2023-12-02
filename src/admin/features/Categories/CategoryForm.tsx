import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ModalRests } from "../../shared/ModalRests";
import { UniversalList } from "../../app/styles";
import Loading from "../../shared/loading";
import { Form, Formik, FormikHelpers, useFormikContext } from "formik";
import { useCreateCategoryMutation, useLazyCategoryQuery, useUpdateCategoryMutation } from "./api";
import { CategoryFormGeneral } from "./CategoryFormGeneral";
import { CategoryFormTranslation } from "./CategoryFormTranslation";

export interface Values {
  name?: string;
  description?: string;
  sort?: number;
  translations?: {
    l?: string;
    t?: string;
  }[];
}

interface Props {
  onBack: () => void;
  selectedCategoryId: number | null | undefined;
}

const CategoryFormComponent: FC<Props> = ({ onBack, selectedCategoryId }) => {
  const i18n = useTranslation();
  const { setValues } = useFormikContext();
  const [loadCategory, { data, isLoading, isFetching }] = useLazyCategoryQuery();

  useEffect(() => {
    if (selectedCategoryId) {
      loadCategory(selectedCategoryId);
    }
  }, [selectedCategoryId]);

  useEffect(() => {
    if (data) {
      setValues({
        name: data.name,
        description: data.description,
        sort: data.sort,
        translations: data.translations,
      });
    } else {
    }
  }, [data]);

  return (
    <Form>
      <ModalRests
        title={selectedCategoryId === null ? i18n.t("categories.form.new") : i18n.t("categories.form.edit")}
        onBack={onBack}
        footerButton={{ title: i18n.t("categories.form.save"), isSubmit: true }}
      >
        <Loading isLoading={isLoading || isFetching} />
        <UniversalList style={{ padding: "15px" }}>
          <CategoryFormGeneral />
          <CategoryFormTranslation />
        </UniversalList>
      </ModalRests>
    </Form>
  );
};

export const CategoryForm: FC<Props> = (props) => {
  const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      validate={(values) => {
        const errors: any = {};
        // if (!values.email) {
        //   errors.email = "Required";
        // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        //   errors.email = "Invalid email address";
        // }
        // if (!values.h) {
        //   errors.h = "Errorw with h";
        // }
        return errors;
      }}
      initialValues={{}}
      onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) => {
        const method = !props.selectedCategoryId ? createCategory : updateCategory;
        method({
          id: props.selectedCategoryId || undefined,
          name: values?.name ?? "",
          description: values?.description,
          sort: values?.sort ?? 100,
          translations: values?.translations?.map((i) => ({ ...i, id: undefined })),
        }).then(() => {
          props.onBack();
          setSubmitting(false);
        });
      }}
    >
      <>
        <Loading isLoading={isCreating || isUpdating} />
        <CategoryFormComponent {...props} />
      </>
    </Formik>
  );
};
