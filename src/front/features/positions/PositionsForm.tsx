import { FC, useEffect } from "react";
import { Box, Button, List, Stack } from "@mui/material";
import { Header } from "../../shared/Header";
import { useAppDispatch, useAppSelector } from "../../app/store";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { positionsActions } from "./slice";
import { EPositionsTabs } from "./enums";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import {
  useDeletePositionMutation,
  useCreatePositionMutation,
  useLazyGetPositionDetailsQuery,
  useUpdatePositionMutation,
} from "./api";
import { LoadingInside } from "../../shared/LoadingInside";
import { borderColorDefault } from "../../app/styles";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { PositionFormGeneral } from "./PositionFormGeneral";
import { searchPositions } from "../../api/positions";
import { PositionFormImage } from "./PositionFormImage";
import { PositionFormTranslation } from "./PositionFormTranslation";
import { PositionFormVariants } from "./PositionFormVariants";
import { PositionFormOptions } from "./PositionFormOptions";
import { PositionFormDescription } from "./PositionFormDescription";
import { PositionFormInstruction } from "./PositionFormInstrunction";
import { useTranslation } from "react-i18next";
import shortid from "shortid";
import { IMAGE_URL } from "../../config";

type Form = {
  n?: string;
  p?: string;
  c?: number;
  s?: number;
  h?: boolean;
  a?: boolean;
  f?: string;
  fUrl?: string;
  fChanged?: boolean;
  v?: {
    n?: string;
    p?: number;
  }[];
  vt?: {
    l?: string;
    t?: number;
  }[][];
  o?: {
    n?: string;
    p?: number;
  }[];
  ot?: {
    l?: string;
    t?: number;
  }[][];
  t?: {
    l?: string;
    t?: number;
  }[];
  d?: string;
  i?: string;
};

export const PositionsForm: FC = () => {
  const dispatch = useAppDispatch();
  const i18n = useTranslation();
  const methods = useForm<Form>({
    resolver: yupResolver(
      yup
        .object({
          n: yup.string().required(i18n.t("positions.form.errors.require")),
          p: yup
            .number()
            .typeError(i18n.t("positions.form.errors.numbers"))
            .required(i18n.t("positions.form.errors.require")),
          s: yup.number().required().typeError(i18n.t("positions.form.errors.numbers")),
          c: yup.number().required(i18n.t("positions.form.errors.require")),
        })
        .required()
    ),
    reValidateMode: "onSubmit",
    defaultValues: {
      n: "",
      p: "",
      c: undefined,
      s: 500,
      h: false,
      a: true,
      v: [],
      vt: [],
      o: [],
      ot: [],
      t: [],
      f: undefined,
      fUrl: undefined,
      fChanged: false,
      d: "",
      i: "",
    },
  });
  const { handleSubmit, reset, setValue } = methods;
  const positionId = useAppSelector((s) => s.positions.positionId);
  const copyPositionId = useAppSelector((s) => s.positions.copyPositionId);

  const [loadPosition, { data, isLoading, isFetching }] = useLazyGetPositionDetailsQuery();
  const [createPosition, { isSuccess: createdPosition, isLoading: isCreating }] = useCreatePositionMutation();
  const [updatePosition, { isSuccess: updatedPosition, isLoading: isUpdating }] = useUpdatePositionMutation();
  const [deletePosition, { isSuccess: deletedPosition, isLoading: isDeleting }] = useDeletePositionMutation();

  useEffect(() => {
    if (positionId) {
      loadPosition(positionId);
    }
  }, [positionId]);

  useEffect(() => {
    if (copyPositionId) {
      loadPosition(copyPositionId);
    }
  }, [copyPositionId]);

  useEffect(() => {
    if (!!createdPosition || !!updatedPosition || !!deletedPosition) {
      dispatch(positionsActions.setPositionId(undefined));
      dispatch(positionsActions.setCopyPositionId(undefined));
      dispatch(positionsActions.setTab(EPositionsTabs.POSITIONS));
      dispatch(searchPositions());
    }
  }, [createdPosition, updatedPosition, deletedPosition]);

  useEffect(() => {
    if (data?.id) {
      reset({
        n: data?.n,
        d: data?.d,
        i: data?.i,
        p: data?.p?.toString(),
        s: data?.s,
        c: data?.c,
        h: data?.h,
        a: data?.a,
        fUrl: data?.f && !copyPositionId ? IMAGE_URL + data?.f : undefined,
        fChanged: false,
        f: undefined,
        v: data?.v?.map((i) => ({ ...i, id: shortid.generate() })),
        vt: data?.vt?.map((i) => i.map((i) => ({ ...i, id: shortid.generate() }))),
        o: data?.o?.map((i) => ({ ...i, id: shortid.generate() })),
        ot: data?.ot?.map((i) => i.map((i) => ({ ...i, id: shortid.generate() }))),
        t: data?.t?.map((i) => ({ ...i, id: shortid.generate() })),
      });
    }
  }, [data]);

  const onSubmit: SubmitHandler<Form> = (form) => {
    const method = !positionId ? createPosition : updatePosition;
    method({
      id: positionId || undefined,
      n: form?.n,
      d: form?.d,
      i: form?.i,
      p: Number(form?.p),
      c: form?.c,
      s: form?.s,
      a: form?.a,
      h: form?.h,
      f: form?.fChanged ? form?.f : undefined,
      fChanged: form?.fChanged,
      t: form?.t?.map((i) => ({ ...i, id: undefined })),
      ot: form?.ot?.map((i) => i.map((i) => ({ ...i, id: undefined }))),
      vt: form?.vt?.map((i) => i.map((i) => ({ ...i, id: undefined }))),
      o: form?.o?.map((i) => ({ ...i, p: Number(i.p), id: undefined })),
      v: form?.v?.map((i) => ({ ...i, p: Number(i.p), id: undefined })),
    });
  };

  const handleClickBack = () => {
    dispatch(positionsActions.setPositionId(undefined));
    dispatch(positionsActions.setCopyPositionId(undefined));
    dispatch(positionsActions.setTab(EPositionsTabs.POSITIONS));
  };

  const handleRemovePosition = () => {
    if (positionId) {
      deletePosition(positionId);
    }
  };

  const loading = isLoading || isFetching || isCreating || isUpdating || isDeleting;

  return (
    <FormProvider {...methods}>
      <Stack direction="column" width="100%" height="100%" paddingRight={2} paddingTop={2} paddingLeft={2}>
        <Header
          title={positionId ? i18n.t("positions.form.editTitle") : i18n.t("positions.form.newTitle")}
          subtitle={positionId ? i18n.t("positions.form.editSubtitle") : i18n.t("positions.form.newSubtitle")}
          startIcon={<ArrowBackIcon onClick={handleClickBack} />}
          endIcon={!loading && <DeleteForeverIcon onClick={handleRemovePosition} />}
          isHaveBorder
        />
        <Stack
          sx={{
            height: "100%",
            flex: "100% 1",
            position: "relative",
            overflowY: "scroll",
          }}
        >
          <LoadingInside isLoading={loading} />
          <List
            sx={{
              height: "100%",
              flex: "100% 1",
              position: "relative",
              overflowY: "scroll",
              li: {
                maxWidth: 500,
                marginLeft: "auto",
                marginRight: "auto",
              },
            }}
          >
            <PositionFormGeneral />
            <PositionFormImage />
            <PositionFormTranslation />
            <PositionFormVariants />
            <PositionFormOptions />
            <PositionFormDescription />
            <PositionFormInstruction />
          </List>
          {!loading && (
            <Box
              sx={{
                borderTop: 1,
                borderColor: borderColorDefault,
                paddingTop: "16px",
                paddingBottom: "16px",
                marginBottom: 0,
                marginTop: 0,
              }}
            >
              <Button
                variant="contained"
                color="primary"
                size="medium"
                fullWidth
                onClick={handleSubmit(onSubmit)}
              >
                {i18n.t("positions.form.save")}
              </Button>
            </Box>
          )}
        </Stack>
      </Stack>
    </FormProvider>
  );
};
