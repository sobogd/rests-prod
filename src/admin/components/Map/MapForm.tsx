import { FC, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ModalRests } from "../ModalRests";
import { Form, Formik, useFormikContext } from "formik";
import { MapBlock } from "./MapBlock";
import FormikRange from "../FormikRange";
import styled from "@emotion/styled";
import FormikSelect from "../Select/FormikSelect";
import FormikCheckbox from "../Checkbox/FormikCheckbox";
import FormikInput from "../FormikInput";
import { ETableType, ITable } from "../../../back/types";
import { useTableCreateMutation, useTableDeleteMutation, useTableUpdateMutation } from "./api";
import { Notice } from "../../hooks/useNotification";

const EditingMap = styled.div`
  width: 100%;
  display: flex;
  padding-bottom: 100%;
  margin-bottom: 70px;
  position: relative;
  margin-top: -70px;
  @media (min-width: 1000px) {
    display: none;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  gap: 15px;
  width: 100%;
  > div {
    width: auto;
  }
`;

export interface MapFormValues {
  is_wall: boolean;
  for_order: boolean;
  wh?: number;
  w?: number;
  h?: number;
  x?: number;
  y?: number;
  type?: ETableType;
  name?: string;
  number?: number;
}

interface Props {
  onBack: () => void;
  refetch: () => void;
  selectedMapId: number | null | undefined;
  isLoading?: boolean;
  tables: ITable[];
  handleChangeGeneralMap: (values: MapFormValues) => void;
}

export const defaultMapFormValues = {
  is_wall: false,
  for_order: false,
  wh: 30,
  w: 30,
  h: 30,
  x: 35,
  y: 35,
  name: "",
  number: 0,
  type: ETableType.TABLE_CIRCLE,
};

const MapFormComponent: FC<Props> = ({
  onBack,
  selectedMapId,
  isLoading,
  refetch,
  tables,
  handleChangeGeneralMap,
}) => {
  const { t } = useTranslation();
  const { values, setValues, resetForm, setFieldValue } = useFormikContext<MapFormValues>();
  const [deleteTable, { isLoading: isDeleting }] = useTableDeleteMutation();

  const selectedMap = useMemo(
    () => tables?.filter((i) => i.id === selectedMapId)?.[0],
    [tables, selectedMapId]
  );

  useEffect(() => {
    handleChangeGeneralMap(values);
  }, [values]);

  useEffect(() => {
    if (values.is_wall) {
      setFieldValue("type", ETableType.WALL);
    } else {
      setFieldValue("type", ETableType.TABLE_CIRCLE);
    }
  }, [values.is_wall]);

  useEffect(() => {
    if (selectedMapId) {
      setValues({
        is_wall: selectedMap.type === ETableType.WALL,
        w: selectedMap.w,
        h: selectedMap.h,
        wh: selectedMap.w,
        type: selectedMap.type,
        x: selectedMap.x,
        y: selectedMap.y,
        for_order: selectedMap.for_order,
        name: selectedMap.name,
        number: selectedMap.number,
      });
    } else {
      setValues(defaultMapFormValues);
    }
  }, [selectedMapId]);

  const handleBack = () => {
    onBack();
    resetForm();
    setValues(defaultMapFormValues);
  };

  useEffect(() => {
    if (values.wh && values.type !== ETableType.WALL) {
      setFieldValue("w", values.wh);
      setFieldValue("h", values.wh);
    }
  }, [values.wh]);

  const CTableTypeOptions: { value: ETableType; label: string }[] = [
    { label: "Square table", value: ETableType.TABLE_SQUARE },
    { label: "Circle table", value: ETableType.TABLE_CIRCLE },
    { label: "Flower", value: ETableType.FLOWER },
    { label: "Door", value: ETableType.DOOR },
    { label: "Window", value: ETableType.WINDOW },
    { label: "Kitchen", value: ETableType.KITCHEN },
    { label: "Grass", value: ETableType.GRASS },
    { label: "Pavilion", value: ETableType.PAVILION },
    { label: "Chair", value: ETableType.CHAIR },
    { label: "Info", value: ETableType.INFO },
    { label: "Trash", value: ETableType.TRASH },
    { label: "WC", value: ETableType.WC },
    { label: "Bar", value: ETableType.BAR },
    { label: "Play", value: ETableType.PLAY },
    { label: "Music", value: ETableType.MUSIC },
    { label: "Tree", value: ETableType.TREE },
    { label: "Storage", value: ETableType.STORAGE },
    { label: "Light", value: ETableType.LIGHT },
  ];

  return (
    <Form>
      <ModalRests
        isShow={selectedMapId !== undefined ? true : false}
        title={selectedMapId === null ? t("map.form.new") : t("map.form.edit")}
        onBack={handleBack}
        footerSticks={[{ icon: "save" }]}
        isLoading={isLoading || isDeleting}
        withPadding
        moreButtons={
          selectedMapId != null
            ? [
                {
                  title: t("map.form.delete"),
                  onClick: () =>
                    deleteTable(selectedMapId ?? 0).then(() => {
                      refetch();
                      onBack();
                      resetForm();
                      setValues(defaultMapFormValues);
                    }),
                },
              ]
            : undefined
        }
      >
        <EditingMap>
          <MapBlock
            items={tables?.filter((i) => i.id !== selectedMapId)}
            tableForEdition={{
              ...selectedMap,
              w: values.w ?? 0,
              h: values.h ?? 0,
              type: values.type ?? ETableType.TABLE_CIRCLE,
              x: values.x ?? 0,
              y: values.y ?? 0,
              for_order: values.for_order,
              number: values.number ?? 0,
            }}
          />
        </EditingMap>
        {values.is_wall ? (
          <>
            <FormikRange min={0} max={100} step={1} name={"w"} label={t("map.form.w")} />
            <FormikRange min={0} max={100} step={1} name={"h"} label={t("map.form.h")} />
          </>
        ) : (
          <FormikRange min={0} max={100} step={1} name={"wh"} label={t("map.form.size")} />
        )}
        <FormikRange min={0} max={100} step={1} name={"x"} label={t("map.form.x")} />
        <FormikRange min={0} max={100} step={1} name={"y"} label={t("map.form.y")} mb />
        <CheckboxContainer>
          <FormikCheckbox name="is_wall" label={t("map.form.is_wall")} mb />
          {!values.is_wall ? <FormikCheckbox name="for_order" label={t("map.form.for_order")} mb /> : null}
        </CheckboxContainer>
        {!values.is_wall ? (
          <FormikSelect name="type" label={t("map.form.type")} options={CTableTypeOptions} mb />
        ) : null}
        {!!values.for_order && !values.is_wall ? (
          <>
            <FormikInput name="name" label={t("map.form.name")} mb />
            <FormikInput name="number" label={t("map.form.number")} mb type="number" />
          </>
        ) : null}
      </ModalRests>
    </Form>
  );
};

export const MapForm: FC<Props> = (props) => {
  const { t } = useTranslation();
  const [createTable, { isLoading: isCreating }] = useTableCreateMutation();
  const [updateTable, { isLoading: isUpdating }] = useTableUpdateMutation();

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      validate={(values) => {
        const errors: any = {};
        if (values.for_order) {
          if (!values.name) errors.name = t("map.form.nameReq");
          if (!values.number) errors.number = t("map.form.numberReq");
        }
        return errors;
      }}
      initialValues={defaultMapFormValues}
      onSubmit={(values: MapFormValues, { resetForm, setValues, setSubmitting }) => {
        const method = !props.selectedMapId ? createTable : updateTable;
        method({
          id: props.selectedMapId || undefined,
          name: values?.name ?? "",
          number: values?.number ?? 0,
          x: values?.x ?? 0,
          y: values?.y ?? 0,
          w: values?.w ?? 0,
          h: values?.h ?? 0,
          type: values?.type ?? ETableType.TABLE_CIRCLE,
          for_order: values.for_order ?? false,
        }).then((res) => {
          // @ts-expect-error
          if (!!res.error) {
            Notice.error(t("map.form.error"));
          } else {
            props.onBack();
            props.refetch();
            resetForm();
            setValues(defaultMapFormValues);
          }
        });
        setSubmitting(false);
      }}
    >
      <MapFormComponent {...props} isLoading={isCreating || isUpdating} />
    </Formik>
  );
};
