import { Box, Button, Slider, Stack, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { Controller, FormProvider, SubmitHandler, useForm, UseFormReturn } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { archiveTable, createTable, searchTables, updateTable } from "./api";
import { ModalForForm } from "../../shared/ModalForForm";
import { SelectControlled } from "../../shared/SelectControlled";
import { InputControlled } from "../../shared/InputControlled";
import { MapBlock } from "./MapBlock";
import { MapElement } from "./MapElement";
import { SwitchControlled } from "../../shared/SwitchControlled";
import { CTableTypeOptions } from "./consts";
import { ETableTypes } from "./enums";
import { tablesSlice } from "./slice";
import { useAppDispatch, useAppSelector } from "../../app/store";

interface IMapForm {
  wall: boolean;
  forOrder: boolean;
  type: { name: string; code: ETableTypes };
  x: number;
  y: number;
  w: number;
  h: number;
  name?: string;
  number?: number;
  wh?: number;
}

const schema = yup
  .object({
    name: yup
      .string()
      .when("forOrder", (forOrder, schema) =>
        forOrder[0] === true ? schema.required("Name is required") : schema.min(0)
      ),
    number: yup
      .number()
      .when("forOrder", (forOrder, schema) =>
        forOrder[0] === true
          ? schema
              .required()
              .min(1, "Number is required (only numbers)")
              .typeError("Number is required (only numbers)")
          : schema.min(0)
      ),
  })
  .required();

export const MapModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const parentForMap = useRef<null | HTMLElement>(null);
  const { form, items, isOpenForm } = useAppSelector((s) => s.tables);

  const methods: UseFormReturn<IMapForm> = useForm<IMapForm>({
    resolver: yupResolver(schema),
    reValidateMode: "onSubmit",
    defaultValues: {
      wall: false,
      forOrder: true,
      x: 45,
      y: 45,
      w: 10,
      h: 10,
      wh: 10,
    },
  });
  const { control, handleSubmit, watch, reset, setValue } = methods;
  const { wall, forOrder, x, y, w, h, type, wh } = watch();

  useEffect(() => {
    if (isOpenForm && !form?.id) {
      if (wall) {
        setValue("type", { name: "", code: ETableTypes.WALL });
        setValue("forOrder", false);
        setValue("w", 5);
        setValue("h", 30);
        setValue("x", 47);
        setValue("y", 35);
        setValue("wh", 10);
      } else {
        setValue("type", CTableTypeOptions[0]);
        setValue("forOrder", false);
        setValue("wh", 10);
        setValue("x", 45);
        setValue("y", 45);
        setValue("w", 10);
        setValue("h", 10);
      }
    }
    if (isOpenForm && !!form?.id) {
      if (wall) {
        setValue("type", { name: "", code: ETableTypes.WALL });
        setValue("forOrder", false);
      } else {
        setValue("type", CTableTypeOptions[0]);
        setValue("forOrder", false);
      }
    }
  }, [wall, isOpenForm]);

  useEffect(() => {
    if (isOpenForm && form?.id) {
      const type =
        form.type === ETableTypes.WALL
          ? { name: "", code: ETableTypes.WALL }
          : CTableTypeOptions.find((o) => o.code === form.type) || CTableTypeOptions[0];

      setValue("type", type);
      setValue("forOrder", form.forOrder);
      setValue("wh", form.w);
      setValue("x", form.x);
      setValue("y", form.y);
      setValue("w", form.w);
      setValue("h", form.h);
      setValue("wall", form.type === ETableTypes.WALL ? true : false);
      if (form.forOrder) {
        setValue("name", form.name);
        setValue("number", form.number);
      }
    }
  }, [form, isOpenForm]);

  useEffect(() => {
    if (wh && type?.code !== ETableTypes.WALL) {
      setValue("w", wh);
      setValue("h", wh);
    }
  }, [wh]);

  const onSubmit: SubmitHandler<IMapForm> = ({ name, number, x, y, w, h, type, forOrder }) => {
    if (!!form?.id) {
      dispatch(
        updateTable({
          id: form?.id,
          name,
          number,
          x,
          y,
          w,
          h,
          type: type.code,
          forOrder,
        })
      ).then(() => dispatch(searchTables()));
    }

    if (!form?.id) {
      dispatch(
        createTable({
          name,
          number,
          x,
          y,
          w,
          h,
          type: type.code,
          forOrder,
        })
      ).then(() => dispatch(searchTables()));
    }
  };

  const handleCloseModal = () => {
    reset();
    dispatch(tablesSlice.actions.closeEditItem());
  };

  const handleArchiveTable = () => {
    if (!!form?.id) {
      reset();
      dispatch(archiveTable(form)).then(() => dispatch(searchTables()));
    }
  };

  return (
    <ModalForForm
      open={isOpenForm}
      onCloseModal={handleCloseModal}
      maxWidth={800}
      title={`${form?.id ? "Edit" : "New"} table`}
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={1}
              margin={0}
              alignItems={{ xs: "flex-start", md: "center" }}
              sx={{
                marginTop: { xs: "-5px !important", md: 0 },
                "div:last-child": {
                  marginTop: {
                    xs: !wall ? "-5px !important" : null,
                    md: "0 !important",
                  },
                },
              }}
            >
              <SwitchControlled name="wall" label="Is roof" />
              {!wall && <SwitchControlled name="forOrder" label="Is possible for order" />}
            </Stack>
            {!wall && <SelectControlled name="type" label="Icon for element" options={CTableTypeOptions} />}
            {!wall && forOrder && <InputControlled name="name" label="Name" />}
            {!wall && forOrder && <InputControlled name="number" label="Number" />}
            <Box ref={parentForMap} sx={{ position: "relative", overflow: "hidden" }}>
              <MapBlock items={items.filter((i) => i.id !== form?.id)} />
              <MapElement
                parentForMap={parentForMap}
                x={x}
                y={y}
                w={w}
                h={h}
                type={type?.code}
                onChangeCoordinates={(x, y) => {
                  setValue("x", x);
                  setValue("y", y);
                }}
              />
            </Box>
            {!wall && <Typography sx={{ marginBottom: "-15px !important" }}>Size</Typography>}
            {!wall && (
              <Controller
                name="wh"
                control={control}
                render={({ field }) => <Slider step={1} max={40} min={5} {...field} />}
              />
            )}
            {wall && <Typography sx={{ marginBottom: "-15px !important" }}>Width</Typography>}
            {wall && (
              <Controller
                name="w"
                control={control}
                render={({ field }) => <Slider step={1} max={100} min={1} {...field} />}
              />
            )}
            {wall && <Typography sx={{ marginBottom: "-15px !important" }}>Height</Typography>}
            {wall && (
              <Controller
                name="h"
                control={control}
                render={({ field }) => <Slider step={1} max={100} min={1} {...field} />}
              />
            )}

            <Button variant="contained" color="primary" size="medium" type="submit">
              Save
            </Button>
            {!!form?.id && (
              <Button variant="contained" color="secondary" size="medium" onClick={handleArchiveTable}>
                Archive
              </Button>
            )}
          </Stack>
        </form>
      </FormProvider>
    </ModalForForm>
  );
};
