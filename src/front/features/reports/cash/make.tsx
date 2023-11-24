import React, { FC, useEffect } from "react";
import { ButtonStyled, ErrorBox } from "../../../app/styles";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import {
  createReport,
  EReportTypes,
  getReports,
} from "../../../entities/reports";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import { Stack } from "@mui/material";
import { InputRests } from "../../../shared/InputRests";
import { SelectRests } from "../../../shared/SelectRests";

type Form = {
  type: EReportTypes;
  sum: number | string;
  description: string;
};

const schema = yup
  .object({
    sum: yup.number().required("Type amount"),
    type: yup.string().required("Select report type"),
    description: yup.string().required("Type description"),
  })
  .required();

export const MakeCashReport: FC = () => {
  const dispatch = useAppDispatch();
  const { reports, error } = useAppSelector((s) => s.reports);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Form>({
    resolver: yupResolver(schema),
    reValidateMode: "onSubmit",
    defaultValues: {
      type: EReportTypes.WITHDRAW,
      sum: "",
      description: "",
    },
  });

  useEffect(() => {
    reset();
  }, [reports]);

  const onSubmit: SubmitHandler<Form> = (form) => {
    if (Number(form.sum) > 0 && form.type && form.description) {
      dispatch(
        createReport({
          sum: Number(form.sum),
          type: form.type,
          description: form.description,
        })
      ).then(() => {
        dispatch(getReports());
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={{ xs: 2, md: 2 }} direction="column">
        <SelectRests
          name="type"
          label="Type"
          options={[
            { label: "Withdraw (–)", value: EReportTypes.WITHDRAW },
            { label: "Deposit (+)", value: EReportTypes.DEPOSIT },
          ]}
          control={control}
          error={errors["type"]?.message}
        />
        <InputRests
          control={control}
          name="sum"
          type="number"
          label="Amount"
          error={errors["sum"]?.message}
        />
        <InputRests
          control={control}
          name="description"
          label="Description"
          rows={3}
          error={errors["description"]?.message}
        />
        {!!error && <ErrorBox style={{ marginBottom: 25 }}>{error}</ErrorBox>}
        <ButtonStyled type="submit">Send</ButtonStyled>
      </Stack>
    </form>
  );
};
