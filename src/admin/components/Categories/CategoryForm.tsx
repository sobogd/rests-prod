import { Form, Formik, FormikHelpers, useFormikContext } from 'formik';
import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Notice } from '../../hooks/useNotification';
import { UniversalList } from '../../styles';
import { Loading } from '../Loading';
import { ModalRests } from '../ModalRests';

import {
  useCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useLazyCategoryQuery,
  useUpdateCategoryMutation,
} from './api';
import { CategoryFormGeneral } from './CategoryFormGeneral';
import { CategoryFormTranslation } from './CategoryFormTranslation';

export interface Values {
  name?: string;
  description?: string;
  sort?: number;
  translations?: {
    l?: string;
    t?: string;
  }[];
}

const defaultValues = {
  name: '',
  description: '',
  sort: 10,
  translations: [],
};

interface Props {
  onBack: () => void;
  refetch: () => void;
  selectedCategoryId: number | null | undefined;
}

const CategoryFormComponent: FC<Props> = ({
  onBack,
  selectedCategoryId,
  refetch,
}) => {
  const i18n = useTranslation();
  const { setValues, resetForm } = useFormikContext();
  const [loadCategory, { data, isLoading, isFetching }] =
    useLazyCategoryQuery();
  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteCategoryMutation();
  const { data: categories } = useCategoriesQuery();

  const getLastSortNumber = () => (categories?.at(-1)?.sort ?? 10) + 1;

  useEffect(() => {
    if (categories) {
      if (selectedCategoryId) {
        loadCategory(selectedCategoryId);
      } else {
        setValues({ ...defaultValues, sort: getLastSortNumber() });
      }
    }
  }, [selectedCategoryId, categories]);

  useEffect(() => {
    if (data && selectedCategoryId != null) {
      setValues({
        name: data.name ?? '',
        description: data.description ?? '',
        sort: data.sort ?? '',
        translations: data.translations ?? [],
      });
    } else {
      setValues({ ...defaultValues, sort: getLastSortNumber() });
    }
  }, [data]);

  return (
    <Form>
      <ModalRests
        title={
          selectedCategoryId === null
            ? i18n.t('categories.form.new')
            : i18n.t('categories.form.edit')
        }
        onBack={onBack}
        footerSticks={[{ icon: 'save' }]}
        isShow={selectedCategoryId !== undefined ? true : false}
        isLoading={isLoading || isFetching || isDeleting}
        moreButtons={
          selectedCategoryId != null
            ? [
                {
                  title: i18n.t('categories.form.remove'),
                  onClick: () =>
                    deleteCategory(selectedCategoryId ?? 0).then(() => {
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
        <UniversalList style={{ padding: '15px' }}>
          <CategoryFormGeneral />
          <CategoryFormTranslation />
        </UniversalList>
      </ModalRests>
    </Form>
  );
};

export const CategoryForm: FC<Props> = (props) => {
  const { t } = useTranslation();
  const [createCategory, { isLoading: isCreating }] =
    useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      validate={(values) => {
        const errors: any = {};
        if (!values.name) errors.name = t('categories.form.nameReq');
        if (!values.description)
          errors.description = t('categories.form.descriptionReq');
        if (!values.sort) errors.sort = t('categories.form.sortReq');

        return errors;
      }}
      initialValues={{}}
      onSubmit={(
        values: Values,
        { setSubmitting, resetForm, setValues }: FormikHelpers<Values>,
      ) => {
        const method = !props.selectedCategoryId
          ? createCategory
          : updateCategory;
        method({
          id: props.selectedCategoryId || undefined,
          name: values?.name ?? '',
          description: values?.description,
          sort: values?.sort ?? 100,
          translations:
            values?.translations?.map((i) => ({ ...i, id: undefined })) ?? [],
        }).then((res) => {
          // @ts-expect-error
          if (res.error) {
            Notice.error(t('users.form.error'));
          } else {
            props.onBack();
            props.refetch();
            resetForm();
            setValues(defaultValues);
          }
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
