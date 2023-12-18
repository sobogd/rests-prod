import { FC, useEffect, useMemo } from "react";
import {
  useCreateItemMutation,
  useDeleteItemMutation,
  useItemsQuery,
  useLazyGetItemDetailsQuery,
  useUpdateItemMutation,
} from "./api";
import { ItemFormGeneral } from "./ItemFormGeneral";
import { ItemFormImage } from "./ItemFormImage";
import { ItemFormVariants } from "./ItemFormVariants";
import { ItemFormOptions } from "./ItemFormOptions";
import { useTranslation } from "react-i18next";
import { ModalRests } from "../ModalRests";
import { Form, Formik, FormikHelpers, useFormikContext } from "formik";
import { Notice } from "../../hooks/useNotification";
import { useAuth } from "../Auth/Context";
import { UniversalList } from "../../styles";
import { IMAGE_URL } from "../../config";

const defaultValues = {
  n: "",
  p: "",
  c: "",
  s: 10,
  h: false,
  a: true,
  f: undefined,
  fChanged: undefined,
  fUrl: undefined,
  v: [],
  vt: [],
  o: [],
  ot: [],
  t: [],
  d: "",
  i: "",
};

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
  refetch: () => void;
  isLoading?: boolean;
  selectedCopyItemId: number | undefined;
  onCopy: () => void;
  selectedItemId: number | null | undefined;
}

const ItemFormComponent: FC<Props> = ({
  onBack,
  selectedCopyItemId,
  selectedItemId,
  refetch,
  isLoading,
  onCopy,
}) => {
  const i18n = useTranslation();
  const { setValues, resetForm, getFieldProps, setFieldValue } = useFormikContext();
  const category = getFieldProps("c").value;

  const langs = useAuth()?.whoami?.company?.langs ?? [];

  const [loadItem, { data, isLoading: isLoadingItem, isFetching, requestId }] = useLazyGetItemDetailsQuery();
  const [deleteItem, { isLoading: isDeleting }] = useDeleteItemMutation();
  const { data: items } = useItemsQuery();

  const getLastSortNumber = (c?: number) =>
    items?.length
      ? (items
          .filter((i) => (!!c ? i.c === Number(c) : true))
          .sort((a, b) => {
            if (a?.s && b?.s && a.s < b.s) {
              return 1;
            } else if (a?.s && b?.s && a.s > b.s) {
              return -1;
            }
            return 0;
          })?.[0]?.s ?? 0) + 1
      : 10;

  const lastSortNumber = useMemo(() => getLastSortNumber(), [items]);

  useEffect(() => {
    if (items && category && !selectedItemId && !selectedCopyItemId) {
      setFieldValue("s", getLastSortNumber(category));
    }
  }, [items, category, selectedItemId, selectedCopyItemId]);

  useEffect(() => {
    if (selectedItemId) {
      loadItem(selectedItemId);
    } else {
      setValues({ ...defaultValues, t: langs.map((lang) => ({ l: lang, t: "" })), s: lastSortNumber });
    }
  }, [selectedItemId]);

  useEffect(() => {
    if (selectedCopyItemId) {
      loadItem(selectedCopyItemId);
    } else {
      setValues({ ...defaultValues, t: langs.map((lang) => ({ l: lang, t: "" })) });
    }
  }, [selectedCopyItemId]);

  useEffect(() => {
    if (data) {
      setValues({
        n: data.n,
        d: "",
        i: "",
        p: data.p?.toString() ?? "",
        c: data.c,
        s: selectedCopyItemId && data.s ? data.s + 1 : data.s,
        a: data.a,
        h: data.h,
        fChanged: false,
        fUrl: data.f && data.f !== "" ? IMAGE_URL + data.f : undefined,
        f: data.f,
        t: data.t?.length ? data.t : langs.map((lang) => ({ l: lang, t: "" })),
        ot: data.ot,
        vt: data.vt,
        o: data.o,
        v: data.v,
      });
    } else {
      setValues({ ...defaultValues, t: langs.map((lang) => ({ l: lang, t: "" })), s: lastSortNumber });
    }
  }, [data, requestId]);

  return (
    <Form>
      <ModalRests
        title={
          selectedItemId === null || selectedCopyItemId !== undefined
            ? i18n.t("items.form.new")
            : i18n.t("items.form.edit")
        }
        onBack={onBack}
        footerSticks={[{ icon: "save" }]}
        isLoading={isLoading || isFetching || isDeleting || isLoadingItem}
        isShow={
          selectedItemId === null || Number(selectedItemId) > 0 || Number(selectedCopyItemId) > 0
            ? true
            : false
        }
        moreButtons={
          selectedItemId != null
            ? [
                {
                  title: i18n.t("items.form.remove"),
                  onClick: () =>
                    deleteItem(selectedItemId ?? 0).then(() => {
                      refetch();
                      onBack();
                      resetForm();
                      setValues(defaultValues);
                    }),
                },
                {
                  title: i18n.t("items.form.copy"),
                  onClick: () => {
                    onCopy();
                  },
                },
              ]
            : undefined
        }
      >
        <UniversalList style={{ padding: "15px" }}>
          <ItemFormGeneral />
          <ItemFormVariants />
          <ItemFormOptions />
          <ItemFormImage />
        </UniversalList>
      </ModalRests>
    </Form>
  );
};

export const ItemForm: FC<Props> = (props) => {
  const { t } = useTranslation();
  const [createItem, { isLoading: isCreating }] = useCreateItemMutation();
  const [updateItem, { isLoading: isUpdating }] = useUpdateItemMutation();

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={{}}
      onSubmit={(values: Values, { setSubmitting, resetForm, setValues }: FormikHelpers<Values>) => {
        const method = !props.selectedItemId ? createItem : updateItem;
        method({
          id: props.selectedItemId || undefined,
          n: values?.n,
          d: values?.d ?? "",
          i: values?.i ?? "",
          p: Number(values?.p),
          c: values?.c,
          s: values?.s,
          a: values?.a ?? false,
          h: values?.h ?? false,
          f: values?.fChanged ? values?.f : undefined,
          fChanged: values?.fChanged,
          t: values?.t?.map((i) => ({ ...i, id: undefined })) ?? [],
          ot: values?.ot?.map((i) => i.map((i) => ({ ...i, id: undefined }))) ?? [],
          vt: values?.vt?.map((i) => i.map((i) => ({ ...i, id: undefined }))) ?? [],
          o: values?.o?.map((i) => ({ ...i, p: Number(i.p), id: undefined })) ?? [],
          v: values?.v?.map((i) => ({ ...i, p: Number(i.p), id: undefined })) ?? [],
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
      <>
        <ItemFormComponent {...props} isLoading={isCreating || isUpdating} />
      </>
    </Formik>
  );
};
