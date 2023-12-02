import { FC, useEffect } from "react";
import { useCreateItemMutation, useLazyGetItemDetailsQuery, useUpdateItemMutation } from "./api";
import { ItemFormGeneral } from "./ItemFormGeneral";
import { ItemFormImage } from "./ItemFormImage";
import { ItemFormTranslation } from "./ItemFormTranslation";
import { ItemFormVariants } from "./ItemFormVariants";
import { ItemFormOptions } from "./ItemFormOptions";
import { useTranslation } from "react-i18next";
import { ModalRests } from "../../shared/ModalRests";
import { UniversalList } from "../../app/styles";
import Loading from "../../shared/loading";
import { Form, Formik, FormikHelpers, useFormikContext } from "formik";

export interface Values {
  n?: string;
  p?: string;
  c?: number | string;
  s?: number;
  h?: boolean;
  a?: boolean;
  f?: string;
  fChanged?: boolean;
  fUrl?: string;
  v?: {
    n?: string;
    p?: number;
  }[];
  vt?: {
    l?: string;
    t?: string;
  }[][];
  o?: {
    n?: string;
    p?: number;
  }[];
  ot?: {
    l?: string;
    t?: string;
  }[][];
  t?: {
    l?: string;
    t?: string;
  }[];
  d?: string;
  i?: string;
}

interface Props {
  onBack: () => void;
  selectedCopyItemId: number | undefined;
  selectedItemId: number | null | undefined;
}

const ItemFormComponent: FC<Props> = ({ onBack, selectedCopyItemId, selectedItemId }) => {
  const i18n = useTranslation();
  const { setValues } = useFormikContext();

  const [loadItem, { data, isLoading, isFetching }] = useLazyGetItemDetailsQuery();

  useEffect(() => {
    if (selectedItemId) {
      loadItem(selectedItemId);
    }
  }, [selectedItemId]);

  useEffect(() => {
    if (selectedCopyItemId) {
      loadItem(selectedCopyItemId);
    }
  }, [selectedCopyItemId]);

  useEffect(() => {
    if (data) {
      setValues({
        n: data.n,
        d: data.d,
        i: data.i,
        p: data.p?.toString() ?? "",
        c: data.c,
        s: data.s,
        a: data.a,
        h: data.h,
        fChanged: false,
        fUrl: undefined,
        f: data.f,
        t: data.t,
        ot: data.ot,
        vt: data.vt,
        o: data.o,
        v: data.v,
      });
    } else {
    }
  }, [data]);

  return (
    <Form>
      <ModalRests
        title={selectedItemId === null || selectedCopyItemId !== undefined ? "New item" : "Edit item"}
        onBack={onBack}
        footerButton={{ title: i18n.t("items.form.save"), isSubmit: true }}
      >
        <Loading isLoading={isLoading || isFetching} />
        <UniversalList style={{ padding: "15px" }}>
          <ItemFormGeneral />
          <ItemFormTranslation />
          <ItemFormVariants />
          <ItemFormOptions />
          <ItemFormImage />
        </UniversalList>
      </ModalRests>
    </Form>
  );
};

export const ItemForm: FC<Props> = (props) => {
  const [createItem, { isLoading: isCreating }] = useCreateItemMutation();
  const [updateItem, { isLoading: isUpdating }] = useUpdateItemMutation();

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
        const method = !props.selectedItemId ? createItem : updateItem;
        method({
          id: props.selectedItemId || undefined,
          n: values?.n,
          d: values?.d,
          i: values?.i,
          p: Number(values?.p),
          c: values?.c,
          s: values?.s,
          a: values?.a,
          h: values?.h,
          f: values?.fChanged ? values?.f : undefined,
          fChanged: values?.fChanged,
          t: values?.t?.map((i) => ({ ...i, id: undefined })),
          ot: values?.ot?.map((i) => i.map((i) => ({ ...i, id: undefined }))),
          vt: values?.vt?.map((i) => i.map((i) => ({ ...i, id: undefined }))),
          o: values?.o?.map((i) => ({ ...i, p: Number(i.p), id: undefined })),
          v: values?.v?.map((i) => ({ ...i, p: Number(i.p), id: undefined })),
        }).then(() => {
          props.onBack();
          setSubmitting(false);
        });
      }}
    >
      <>
        <Loading isLoading={isCreating || isUpdating} />
        <ItemFormComponent {...props} />
      </>
    </Formik>
  );
};
